import { db } from "../configs/db.config.js";


export async function createPotholesTable() {
  try {
    await db.query(
      `CREATE TABLE IF NOT EXISTS potholes (
        id SERIAL PRIMARY KEY,
        latitude DECIMAL NOT NULL,
        longitude DECIMAL NOT NULL,
        status VARCHAR(10) NOT NULL DEFAULT 'active'
          CHECK(status IN ('active', 'fixed')),
        severity VARCHAR(6)
          CHECK(severity IN ('low', 'medium', 'high')),
        uploaded_by VARCHAR REFERENCES users(id) ON DELETE CASCADE,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    );
  } catch (error) {
    console.error('error while creating potholes table =>', error);
  }
}
