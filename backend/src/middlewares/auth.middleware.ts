import type { Request, Response, NextFunction } from "express";
import { db } from "../configs/db.config.js";
import { verifyToken } from "../utils/token.util.js";

export async function authenticateUser(request: Request, response: Response, nextFunction: NextFunction) {
    const token = request.cookies.user_token;

    if (!token) {
        return response.
            status(401)
            .json({ message: "unauthorized: user token not found" });
    }

    const user_id = verifyToken(token);

    const result = await db.query(`
            SELECT EXISTS (
                SELECT id
                FROM users
                WHERE id = $1
                );`,
        [user_id]
    )

    if (!result.rows[0].exists) {
        return response.
            status(401)
            .json({ message: "unauthorized: user not found" });

    }

    request.body.user_id = user_id;
    nextFunction();

    return;
}