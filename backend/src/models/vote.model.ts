import { db } from "../configs/db.config.js";


export async function createPotholeVotesTables() {
  try {

    await db.query(`
      CREATE TABLE IF NOT EXISTS pothole_votes (
        id SERIAL PRIMARY KEY,
        pothole_id INT REFERENCES potholes(id) ON DELETE CASCADE,
        user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
        vote_type VARCHAR CHECK (vote_type IN ('upvote', 'downvote')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (error) {
    console.log('error while creating pothole votes table', error);
  }
}