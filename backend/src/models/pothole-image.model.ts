import { db } from "../configs/db.config.js";

export async function createPotholeImagesTable() {
    try {
        await db.query(
            `CREATE TABLE IF NOT EXISTS pothole_images (
                    id SERIAL PRIMARY KEY,
                    link VARCHAR NOT NULL,
                    pothole_id INT REFERENCES potholes(id) ON DELETE CASCADE,
                    uploaded_by VARCHAR REFERENCES users(id) ON DELETE CASCADE,
                    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                );`
        );
    }
    catch (error) {
        console.error('error while creating pothole_images table =>', error);
    }
}