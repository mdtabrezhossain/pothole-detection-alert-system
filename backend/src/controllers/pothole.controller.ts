import type { Request, Response } from "express";
import { db } from "../configs/db.config.js";
import { angleDifference, calculateDirection, evaluatePothole, getNearbyPotholes } from "../utils/pothole.util.js";

export async function createPothole(request: Request, response: Response) {
    try {
        const { pothole } = request.body;
        const requiredFields = ["latitude", "longitude", "image_links"];

        if (!pothole
            || !requiredFields
                .every(key => pothole[key] != null)
        ) {
            const missingFields = requiredFields
                .filter(key => pothole?.[key] == null)
                .join(", ");

            return response.status(400).json({
                message: "bad request",
                details: `Missing required pothole fields: ${missingFields}`
            });
        }

        const {
            latitude,
            longitude,
            image_links: imageLinks,
            severity,
        } = pothole;
        const radius = 15;

        const nearbyPotholes = await getNearbyPotholes(latitude, longitude, radius);

        if (nearbyPotholes[0]) {
            return response.status(409).json({
                message: "conflict",
                details: "Pothole already exists. You can vote or upload images now",
                pothole: { id: nearbyPotholes[0].id }
            });
        }

        const { id: userId } = request.body.currentUser;

        await db.query("BEGIN");

        const potholeInsertResult = await db.query(
            `INSERT INTO potholes (
                latitude,
                longitude,
                status,
                severity,
                uploaded_by
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`,
            [
                latitude,
                longitude,
                "active",
                severity,
                userId
            ]
        );

        const potholeId = potholeInsertResult.rows[0].id;

        for (const link of imageLinks) {
            await db.query(
                `INSERT INTO pothole_images (
                    link,
                    pothole_id,
                    uploaded_by
                )
                VALUES ($1, $2, $3);`,
                [link, potholeId, userId]
            );
        }

        await db.query("COMMIT");

        return response.status(201)
            .json({ pothole: { ...potholeInsertResult.rows[0] } });

    } catch (error) {
        await db.query("ROLLBACK");

        console.error("Error while adding pothole =>", error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went wrong on our side"
        });
    }
}

export async function findNearbyPotholes(request: Request, response: Response) {
    try {
        const { lat, lng } = request.query;

        if (!lat || !lng) {
            return response.status(400).json({
                message: "bad request",
                details: `Missing location latitude or longitude`
            });
        }
        const latitude = Number(lat);
        const longitude = Number(lng);

        const nearbyPotholes = await getNearbyPotholes(latitude, longitude, 1000);

        return response.json(nearbyPotholes);
    }

    catch (error) {
        console.error("Error while getting nearby pothole =>", error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went wrong on our side"
        });
    }
}

export async function updatePothole(request: Request, response: Response) {
    try {
        const potholeId = request.params.id;
        const { image_links: imageLinks } = request.body.pothole;

        if (!potholeId || !imageLinks || imageLinks.length === 0) {
            return response.status(400)
                .json({
                    message: "bad request",
                    details: "Missing pothole-id or images"
                });
        }

        await db.query("BEGIN");

        const result = await db.query(
            `UPDATE potholes
            SET updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING *;`,
            [potholeId]
        );

        if (!result.rows[0]) {
            await db.query("ROLLBACK");

            return response.status(404).json({
                message: "pothole does not exist"
            });
        }

        for (const link of imageLinks) {
            const userId = request.body.currentUser.id;

            await db.query(
                `INSERT INTO pothole_images (
                    link,
                    pothole_id,
                    uploaded_by
                )
                VALUES ($1, $2, $3);`,
                [link, potholeId, userId]
            );
        }

        await db.query("COMMIT");

        return response.status(200).json({ pothole: result.rows[0] });
    } catch (error) {
        await db.query("ROLLBACK");

        console.error("Error while updating pothole =>", error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went wrong on our side"
        });
    }
}

export async function deletePothole(request: Request, response: Response) {
    try {
        const { id } = request.params;

        await db.query(`DELETE from potholes WHERE id = $1;`, [id]);

        return response.status(204).json({ message: "no content" });
    }
    catch (error) {
        console.error("Error while deleting pothole =>", error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went wrong on our side"
        });
    }
}

export async function getRealTimeAlerts(request: Request, response: Response) {
    try {
        const { lat, lng, hd } = request.query;

        if (!lat || !lng || hd == null) {
            return response.status(400).json({
                message: "bad request",
                details: `Missing location latitude or longitude or heading`
            });
        }

        const latitude = Number(lat);
        const longitude = Number(lng);
        const heading = Number(hd);


        const potholes = await getNearbyPotholes(latitude, longitude, 100, 3);

        if (!potholes) {
            return response.status(200).end();
        }

        const potholesToAlert = [];

        for (const pothole of potholes) {
            const { latitude: potholeLatitude, longitude: potholeLongitude } = pothole;

            const potholeDirection = calculateDirection(latitude, longitude, potholeLatitude, potholeLongitude);
            const directionDifference = angleDifference(heading, potholeDirection);

            if (directionDifference <= 30) {
                potholesToAlert.push(pothole);
            }
        }

        return response.status(200).json({ potholes: potholesToAlert });
    } catch (error) {
        console.error("Error while getting real time pothole alert =>", error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went wrong on our side"
        });
    }
}