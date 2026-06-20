import type { Request, Response } from "express";
import imageKit from "../utils/imagekit.js";
import envVars from "../configs/env.config.js";
import { db } from "../configs/db.config.js";


export function getImageKitToken(request: Request, response: Response) {
    try {
        const { imageKitPublicKey } = envVars;
        const expireTimestamp = Math.floor(Date.now() / 1000) + 120;
        const authParams = imageKit.getAuthenticationParameters(undefined, expireTimestamp);

        return response.status(200)
            .json({
                ...authParams,
                public_key: imageKitPublicKey
            });
    }
    catch (error) {
        console.error(`Error while creating image kit token =>`, error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went wrong on our side"
        });
    }
}

export function getImageVerification(request: Request, response: Response) {
    try {
        const body = request.body;

        return response.status(200)
            .json({ message: 'image received for verification' });
    }
    catch (error) {
        console.error(`Error while getting image verification =>`, error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went wrong on our side"
        });
    }
}

export async function getImages(request: Request, response: Response) {
    try {
        const { potholeId } = request.params;
        const { offset } = request.query;

        let query;
        let values;

        if (!offset) {
            query = `SELECT *
            FROM pothole_images
            WHERE pothole_id = $1
            ORDER BY uploaded_at DESC
            LIMIT 10`;

            values = [potholeId];
        } else {
            query = `SELECT *
            FROM pothole_images
            WHERE pothole_id = $1
            AND uploaded_at < $2
            ORDER BY uploaded_at DESC
            LIMIT 10`;

            values = [potholeId, offset];
        }

        const result = await db.query(query, values);

        response.status(200).json({ images: result.rows });

    } catch (error) {
        console.error(`Error while getting images =>`, error);

        return response.status(500).json({
            message: "internal server error",
            details: "Something went wrong on our side"
        });
    }
}