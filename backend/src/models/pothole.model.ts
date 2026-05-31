import { db } from "../configs/db.config.js";


export async function createPotholesTable() {
  try {
    await db.query(
      `CREATE TABLE IF NOT EXISTS potholes (
        id SERIAL PRIMARY KEY,
        latitude DECIMAL,
        longitude DECIMAL,
        status VARCHAR(10) NOT NULL
          CHECK(status IN ('active', 'fixed')),
        severity_level VARCHAR(6) NOT NULL
          CHECK(severity_level IN ('low', 'medium', 'high')),
        uploaded_by VARCHAR REFERENCES users(id) ON DELETE CASCADE,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    );
  } catch (error) {
    console.error('error while creating potholes table =>', error);
  }
}
