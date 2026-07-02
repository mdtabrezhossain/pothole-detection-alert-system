import type { Request, Response } from "express";
import { db } from "../configs/db.config.js";
import { createUserToken } from "../utils/token.util.js";
import { generateUserPasswordHash, verifyUserPassword } from "../utils/password.util.js";
import type { CookieOptions } from "express";
import { DatabaseError } from "pg";

export async function createUser(request: Request, response: Response) {
    try {
        const { id: userId, name: userName, password: userPassword } = request.body.user;

        if (!userId || !userName || !userPassword) {
            return response.status(400).json({
                message: "bad request",
                details: "Please provide all the information"
            });
        }

        const passwordHash = await generateUserPasswordHash(userPassword);

        const result = await db.query(
            `INSERT INTO users (id, name, password_hash, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, role;`,
            [userId, userName, passwordHash, "regular"]
        );

        const user = result.rows[0];
        const { id, name, role } = user;

        const token = createUserToken(id, name, role);

        const cookieOptions: CookieOptions = {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            // sameSite: 'none',
            // secure: true
        };

        return response
            .status(201)
            .cookie("user_token", token, cookieOptions)
            .json({
                user,
                message: 'Signup successful'
            });
    }
    catch (error) {
        console.error(`Error from creating user => `, error);

        if (error instanceof DatabaseError) {
            if (error.code === "23505") {
                return response.status(409).json({
                    message: "conflict",
                    details: "User already exists"
                });
            }
        }

        return response.status(500).json({
            message: "internal server error",
            details: "Something went wrong on our side"
        });
    }
}

export async function userLogin(request: Request, response: Response) {
    try {
        const { id: userId, password: userPassword } = request.body.user;

        if (!userId || !userPassword) {
            return response.status(400).json({
                message: "bad request",
                details: "Please provide userId and password"
            });
        }

        const result = await db.query(
            `SELECT *
            FROM users
            WHERE id = $1;`,
            [userId]
        );

        const user = result.rows[0];

        if (!user) {
            return response.status(404).json({
                message: "not found",
                details: "User does not exist"
            });
        }

        const passwordHash = user.password_hash;
        const isCorrectPassword = await verifyUserPassword(userPassword, passwordHash);

        if (!isCorrectPassword) {
            return response.status(403).json({
                message: "forbidden",
                details: "Incorrect password"
            });
        }

        const { id, name, role } = user;
        const token = createUserToken(id, name, role);

        const cookieOptions: CookieOptions = {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            // sameSite: "none",
            // secure: true,
        };

        return response
            .status(200)
            .cookie("user_token", token, cookieOptions)
            .json({
                user: { id, name, role },
                message: 'Login successful'
            });

    } catch (error) {
        console.error(`Error logging-in user => `, error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went wrong on our side"
        });
    }
}

export async function userLogout(request: Request, response: Response) {
    try {

        const cookieOptions: CookieOptions = {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            // sameSite: "none",
            // secure: true,
        };

        return response
            .status(200)
            .clearCookie("user_token", cookieOptions)
            .json({ message: 'Logout successful' });
    }
    catch (error) {
        console.error(`Error logging-out user => `, error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went wrong on our side"
        });
    }
}

export async function updateUser(request: Request, response: Response) {
    try {
        const targetUserId = request.params.id;
        const { id: userId, name: userName, password: userPassword } = request.body.user;
        const fieldsToUpdateWithPlaceholder: string[] = [];
        const values: any[] = [];

        if (userId) {
            values.push(userId);
            fieldsToUpdateWithPlaceholder.push(`id = $${values.length}`);
        }
        if (userName) {
            values.push(userName);
            fieldsToUpdateWithPlaceholder.push(`name = $${values.length}`);
        }
        if (userPassword) {
            const passwordHash = await generateUserPasswordHash(userPassword);

            values.push(passwordHash);
            fieldsToUpdateWithPlaceholder.push(`password_hash = $${values.length}`);
        }

        if (fieldsToUpdateWithPlaceholder.length === 0) {
            return response.status(400).json({
                message: "bad request",
                details: "No information given for update"
            });
        }

        values.push(targetUserId);

        const result = await db.query(
            `UPDATE users
            SET ${fieldsToUpdateWithPlaceholder.join(", ")}
            WHERE id = $${values.length}
            RETURNING id, name, role;`,
            values
        );

        const user = result.rows[0];

        if (!user) {
            return response.status(404).json({
                message: "not found",
                details: "User does not exist"
            });
        }

        const { id, name, role } = user;
        const token = createUserToken(id, name, role);

        const cookieOptions: CookieOptions = {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "none",
            // secure: true,
        };

        return response
            .status(200)
            .cookie("user_token", token, cookieOptions)
            .json({ user });
    } catch (error) {
        console.error("Error updating user =>", error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went on our side"
        });
    }
}

export async function deleteUser(request: Request, response: Response) {
    try {
        const targetUserId = request.params.id;

        const result = await db.query(
            `SELECT id, role, password_hash
            FROM users
            WHERE id = $1;`,
            [targetUserId]
        );

        const targetUser = result.rows[0];
        const isTargetUserAdmin = targetUser.role === 'admin';
        const currentUser = request.body.currentUser;
        const isSelfDelete = currentUser.id == targetUserId;

        if (isSelfDelete) {
            const userPassword = request.body.user.password;

            if (!userPassword) {
                return response.status(400).json({
                    message: "bad request",
                    details: "Please provide password"
                });
            }

            const passwordHash = targetUser.password_hash

            const isCorrectPassword = await verifyUserPassword(userPassword, passwordHash);

            if (!isCorrectPassword) {
                return response.status(403).json({
                    message: "forbidden",
                    details: "Incorrect password"
                });
            }
        }
        else if (isTargetUserAdmin) {
            return response.status(403).json({
                message: "forbidden",
                details: "Admins cannot delete other admins"
            });
        }

        const deleteResult = await db.query(
            `DELETE FROM users
            WHERE id = $1
            RETURNING id, name, role;`,
            [targetUserId]
        );

        if (isSelfDelete) {
            const cookieOptions: CookieOptions = {
                httpOnly: true,
                sameSite: "none",
                // secure: true
            };

            response.clearCookie("user_token", cookieOptions);
        }

        const deletedUser = deleteResult.rows[0];

        return response.status(200).json({
            user: deletedUser
        });

    } catch (error) {
        console.error("Error deleting user =>", error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went wrong on our side"
        });
    }
}