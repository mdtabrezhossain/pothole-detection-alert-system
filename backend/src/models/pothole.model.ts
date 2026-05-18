import { db } from "../configs/db.config.js";


export async function createPotholesTables() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS potholes (
        id SERIAL PRIMARY KEY,
        latitude DECIMAL,
        longitude DECIMAL,
        severity_level VARCHAR(6) NOT NULL CHECK(severity_level IN ('small', 'medium', 'large')),
        status VARCHAR(10) NOT NULL CHECK(status IN ('active', 'fixed')),
        direction FLOAT,
        image_link VARCHAR,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        uploaded_by VARCHAR REFERENCES users(id) ON DELETE CASCADE
      );
    `);
  } catch (error) {
    console.log('error while creating potholes table', error);
  }
}
