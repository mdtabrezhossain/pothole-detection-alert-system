import { config } from "dotenv";


config();

const envVars = Object.freeze({
    host: requiredEnv("POSTGRES_HOST"),
    port: requiredNumberEnv("POSTGRES_PORT"),
    database: requiredEnv("POSTGRES_DATABASE"),
    user: requiredEnv("POSTGRES_USER"),
    password: requiredEnv("POSTGRES_PASSWORD"),
    jwtSecretKey: requiredEnv("JWT_SECRET_KEY"),
    userPasswordPepper: requiredEnv("USER_PASSWORD_PEPPER"),
    frontendUrl: requiredEnv("FRONTEND_URL"),
});

function requiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`missing required environment variable: ${name}`);
    }

    return value;
}

function requiredNumberEnv(name: string): number {
    const value = requiredEnv(name);
    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
        throw new Error(`environment variable ${name} must be a number`);
    }

    return numberValue;
}


export default envVars;