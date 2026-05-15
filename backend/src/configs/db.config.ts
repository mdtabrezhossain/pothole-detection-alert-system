import { Pool } from 'pg';
import envVars from './env.config.js';


export const db = new Pool({
    host: envVars.host,
    port: envVars.port,
    user: envVars.user,
    password: envVars.password,
    database: envVars.database,
    // ssl: { rejectUnauthorized: false }
});

export async function connectDB() {
    try {
        await db.connect();
        const result = await db.query('SELECT NOW()');
        console.log(`connected to database at ${result.rows[0].now}`);
    } catch (error) {
        console.error(`cannot connect to database: ${error}`);
    }
}
