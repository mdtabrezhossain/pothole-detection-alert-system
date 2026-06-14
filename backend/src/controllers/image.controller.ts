import type { Request, Response } from "express";
import imageKit from "../utils/imagekit.js";
import envVars from "../configs/env.config.js";


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