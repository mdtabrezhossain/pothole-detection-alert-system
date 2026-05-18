import type { Request, Response } from "express";
import { db } from "../configs/db.config.js";


export async function addPothole(request: Request, response: Response) {
    const {
        latitude,
        longitude,
        severity_level,
        status,
        direction,
        image_link,
    } = request.body.pothole_details;
    const { user_id } = request.body.user_id;

    await db.query(
        `INSERT INTO potholes 
        (
            latitude,
            longitude,
            severity_level,
            status,
            direction,
            image_link,
            uploaded_by
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
            latitude,
            longitude,
            severity_level,
            status,
            direction,
            image_link,
            user_id
        ]
    );

    return response
        .status(200)
        .json({
            pothole_details: {
                latitude,
                longitude,
                severity_level,
                status,
                direction,
                image_link,
                uploaded_by: user_id
            }
        });
}