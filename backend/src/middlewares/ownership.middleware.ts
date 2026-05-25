import type { Request, Response, NextFunction } from "express";
import { db } from "../configs/db.config.js";


export function verifyOwnership(tableName: string, columnName: string) {
    return async function (request: Request, response: Response, next: NextFunction) {
        try {
            const targetId = request.params.id;
            const currentUser = request.body.currentUser;

            const result = await db.query(
                `SELECT ${columnName}
               FROM ${tableName}
               WHERE id = $1
               `,
                [targetId]
            );

            const target = result.rows[0];

            if (!target) {
                return response.status(404).json({
                    message: "not found",
                    details: "Target does not exist"
                });
            }

            if (currentUser.role === "admin") {
                return next();
            }

            const ownerId = target[columnName];

            if (ownerId !== currentUser.id) {
                return response.status(403).json({
                    message: "forbidden",
                    details: "You are not allowed to access URL"
                });
            }

            return next();

        } catch (error) {
            console.error("Error verifying ownership =>", error);

            return response.status(500).json({
                message: "internal server error",
                details: "Something went wrong on our side"
            });
        }
    };
}