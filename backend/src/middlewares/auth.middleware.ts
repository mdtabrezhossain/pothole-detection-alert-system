import type { Request, Response, NextFunction } from "express";
import { db } from "../configs/db.config.js";
import { verifyUserToken } from "../utils/token.util.js";

export async function authenticateUser(request: Request, response: Response, nextFunction: NextFunction) {
    try {
        const token = request.cookies.user_token;

        if (!token) {
            return response.status(401).json({
                message: "unauthorized",
                details: "Please login or signup"
            });
        }

        const payload = verifyUserToken(token);

        const result = await db.query(
            `SELECT EXISTS (
                SELECT id
                FROM users
                WHERE id = $1
            );`,
            [payload.id]
        )

        if (!result.rows[0].exists) {
            return response.status(404).json({
                message: "not found",
                details: "User not found"
            });
        }

        request.body.currentUser = payload;
        nextFunction();

        return;
    }
    catch (error) {
        console.error("Error while user authorization =>", error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went on our side"
        });
    }
}

export async function authenticateAdmin(request: Request, response: Response, nextFunction: NextFunction) {
    try {
        const { id } = request.body.currentUser;

        const result = await db.query('SELECT role FROM users WHERE id = $1;', [id]);

        if (result.rows[0].role !== 'admin') {
            return response.status(403).json({
                message: "forbidden",
                details: "Only admins can access this url"
            });
        }

        nextFunction();
        return;
    }
    catch (error) {
        console.error("Error while admin authorization =>", error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went on our side"
        });
    }
}


