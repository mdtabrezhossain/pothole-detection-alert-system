import { db } from "../configs/db.config.js";


export async function createPotholeVotesTables() {
  try {
    await db.query(
      `CREATE TABLE IF NOT EXISTS pothole_votes (
        id SERIAL PRIMARY KEY,
        type VARCHAR
          CHECK (type IN ('up', 'down')),
        rating VARCHAR
          CHECK (
            (type = 'up' AND rating IS NOT NULL)
            OR (type = 'down' AND rating IS NULL)
          ),
        pothole_id INT REFERENCES potholes(id) ON DELETE CASCADE,
        voted_by VARCHAR REFERENCES users(id) ON DELETE CASCADE,
        given_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    );
  } catch (error) {
    console.log('error while creating pothole_votes table =>', error);
  }
}