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
    const { user_id } = request.body;

    const result = await db.query(
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
        .json({ pothole_details: result.rows[0] });
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

    return response.json(result.rows);
}

export async function updatePothole(request: Request, response: Response) {
    const { id } = request.params;
    const { pothole_details } = request.body;

    const allowedDetailFields = [
        "severity_level",
        "direction",
        "image_link"
    ];

    const updatableFields = Object
        .keys(pothole_details)
        .filter((field) => allowedDetailFields.includes(field));

    if (updatableFields.length === 0) {
        return response
            .status(400)
            .json({ message: "no valid data provided for pothole detail update" });
    }

    const setClause = updatableFields
        .map((field, idx) => `${field} = $${idx + 1}`)
        .join(", ");

    const values = updatableFields.map((field) => pothole_details[field]);
    values.push(id);

    const query = `
            UPDATE potholes
            SET
                ${setClause},
                updated_at = NOW()
            WHERE id = $${values.length}
            RETURNING *
        `;

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
        return response
            .status(404)
            .json({ message: "pothole not found" });
    }

    return response
        .status(200)
        .json(result.rows[0]);
}

export async function removePothole(request: Request, response: Response) {
    const { id } = request.params;

    const result = await db.query(
        `DELETE from potholes
        WHERE id = $1
        `,
        [id]
    );

    if (result.rowCount === 0) {
        return response
            .status(404)
            .json({ message: "pothole not found" });
    }

    return response.status(200).end();
}