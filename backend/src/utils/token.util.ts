import jwt from 'jsonwebtoken';
import envVars from '../configs/env.config.js';
import { error } from 'node:console';


const { jwtSecretKey } = envVars;

export function createUserToken(id: string) {
    try {
        const payload = { user_id: id }

        const token = jwt.sign(
            payload,
            jwtSecretKey,
            { expiresIn: (30 * 24 * 60 * 60 * 1000) },
        );

        return token;
    }
    catch (error) {
        console.error(`error while creating user jwt token`);
        throw error;
    }
}

export function verifyToken(token: string) {
    try {
        const payload = jwt.verify(token, jwtSecretKey);

        if (typeof payload === "string") {
            throw error;
        }

        return payload.user_id;
    }
    catch (error) {
        console.log(`error while verifying user jwt token`);
        throw error;
    }
}
