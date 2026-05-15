import { db } from "../configs/db.config.js";


export async function createPotholesTables() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS potholes (
        id SERIAL PRIMARY KEY,
        image_link VARCHAR,
        latitude DECIMAL,
        longitude DECIMAL,
        severity_level INT,
        confidence_score FLOAT,
        status VARCHAR(10) NOT NULL CHECK(status IN ('active', 'fixed')),
        direction FLOAT,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        uploaded_by VARCHAR REFERENCES users(id) ON DELETE CASCADE
      );
    `);
  } catch (error) {
    console.log('error while creating potholes table', error);
  }
}
