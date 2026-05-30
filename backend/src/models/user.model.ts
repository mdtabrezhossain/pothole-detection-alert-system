import { db } from "../configs/db.config.js";


export async function createUsersTable() {
  try {
    await db.query(
      `CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(25) PRIMARY KEY NOT NULL CHECK (id ~ '^[a-z0-9]+$'),
        name VARCHAR(25),
        role VARCHAR(7) NOT NULL CHECK (role IN ('admin', 'regular')),
        password_hash VARCHAR(60) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`);
  }
  catch (error) {
    console.error('error while creating user table =>', error);
  }
}
