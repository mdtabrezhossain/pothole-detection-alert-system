import type { Request, Response } from "express";
import { db } from "../configs/db.config.js";
import { evaluatePothole } from "../utils/pothole.util.js";

export async function createVote(request: Request, response: Response) {
    try {
        const potholeId = request.params.id;
        const userId = request.body.currentUser.id;
        const { type: voteType, rating } = request.body.pothole.vote;

        if (!voteType) {
            return response.status(400)
                .json({
                    message: "bad request",
                    details: "Missing vote type or rating"
                });
        }

        const result = await db.query(
            `INSERT INTO pothole_votes
            (type, rating, pothole_id, voted_by)
            VALUES ($1, $2, $3, $4);`,
            [voteType, rating, potholeId, userId]
        );

        // evaluatePothole(potholeId as string);

        if (result.rows.length == 0) {
            return response.status(500).json({
                message: "internal server error",
                details: "Something went wrong on our side"
            });
        }

        return response.status(200).end();

    } catch (error) {
        console.error("Error while pothole voting =>", error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went wrong on our side"
        });
    }
}