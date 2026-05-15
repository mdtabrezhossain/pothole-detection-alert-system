import envVars from "../configs/env.config.js";
import { compare, genSalt, hash } from "bcryptjs";


const pepper = envVars.userPasswordPepper;

export async function generateUserPasswordHash(password: string) {
    try {
        const salt = await genSalt(12);
        const hashedPassword = await hash((password + pepper), salt);
        return hashedPassword;
    }
    catch (error) {
        console.error(`error while generating user password hash ${error}`);
        throw error;
    }
}

export async function verifyUserPassword(password: string, passwordHash: string) {
    return await compare(password + pepper, passwordHash);
}