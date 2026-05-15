import jwt from 'jsonwebtoken';
import envVars from '../configs/env.config.js';


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
        console.error(`error while creating user token`);
        throw error;
    }
}
