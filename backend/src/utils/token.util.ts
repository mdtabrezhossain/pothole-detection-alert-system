import jwt, { type JwtPayload } from 'jsonwebtoken';
import envVars from '../configs/env.config.js';

const { jwtSecretKey } = envVars;

export function createUserToken(id: string, name: string, role: string) {
    try {
        const payload = {
            id,
            name,
            role
        }

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

export function verifyUserToken(token: string) {
    try {
        const payload = jwt.verify(token, jwtSecretKey);

        if (typeof payload === "string") {
            throw new Error("invalid token payload");
        }

        return payload;
    }
    catch (error) {
        console.log(`error while verifying user jwt token`);
        throw error;
    }
}
