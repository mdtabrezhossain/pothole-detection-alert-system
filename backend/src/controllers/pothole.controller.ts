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
        `INSERT INTO potholes (
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

export async function getNearbyPotholes(request: Request, response: Response) {
    const { lat, lng, radius } = request.query;

    const result = await db.query(
        `SELECT * FROM (
            SELECT *,
                (
                    6371000 
                    * acos(
                        cos(radians($1))
                        * cos(radians(latitude))
                        * cos(radians(longitude) - radians($2))
                        + sin(radians($1))
                        * sin(radians(latitude))
                    )
                ) AS distance
            FROM potholes
        ) AS temp_calculated_table
        WHERE distance < $3
        ORDER BY distance;`,
        [lat, lng, radius]
    );

    response.json(result.rows.length);
}
