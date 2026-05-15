import type { Request, Response } from "express";
import { db } from "../configs/db.config.js";
import { createUserToken } from "../utils/token.util.js";
import { generateUserPasswordHash, verifyUserPassword } from "../utils/password.util.js";


export async function createUser(request: Request, response: Response
) {
    const { id, name, password } = request.body;

    if (!id || !name || !password) {
        return response
            .status(400)
            .json({ error: "bad request: missing required fields" });
    }

    const passwordHash = await generateUserPasswordHash(password);

    await db.query(
        `INSERT INTO users 
            (id, name, password_hash, role)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
        [id, name, passwordHash, "regular"]
    );

    const user = { id, name };
    const token = createUserToken(id);

    return response
        .status(201)
        .cookie("user_token", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            // secure: true,
            sameSite: "none",
        })
        .json({ user });
}

export async function userLogin(request: Request, response: Response) {
    const { id, password } = request.body;

    if (!id || !password) {
        return response
            .status(400)
            .json({ error: "bad request: missing required field" });
    }

    const result = await db.query(
        `SELECT *
            FROM users
            WHERE id = $1;`,
        [id]
    );

    if (result.rows.length === 0) {
        return response
            .status(404)
            .json({ error: "not found: user does not exist" });
    }

    const passwordHash = result.rows[0].password_hash;
    const isCorrectPassword = await verifyUserPassword(password, passwordHash);

    if (!isCorrectPassword) {
        return response
            .status(403)
            .json({ message: "forbidden: incorrect password" });

    }

    const { name, created_at } = result.rows[0];
    const user = { id, name, created_at };
    const token = createUserToken(user.id);


    return response
        .status(200)
        .cookie("user_token", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            // secure: true,
            sameSite: "none",
        })
        .json({ user });
}
