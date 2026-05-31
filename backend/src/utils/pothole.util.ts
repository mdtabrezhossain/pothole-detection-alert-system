import { db } from "../configs/db.config.js";


export async function evaluatePothole(potholeId: string) {
    try {
        const voteStatsResult = await db.query(
            `SELECT
                SUM(CASE WHEN type = 'up' THEN 1 ELSE 0 END) AS up_votes,
                SUM(CASE WHEN type = 'down' THEN 1 ELSE 0 END) AS down_votes,
                SUM(CASE WHEN rating = 'low' THEN 1 ELSE 0 END) AS low_ratings,
                SUM(CASE WHEN rating = 'medium' THEN 1 ELSE 0 END) AS medium_ratings,
                SUM(CASE WHEN rating = 'high' THEN 1 ELSE 0 END) AS high_ratings
            FROM pothole_votes
            WHERE pothole_id = $1;`,
            [potholeId]
        );

        const stats = voteStatsResult.rows[0];

        if (!stats) {
            return;
        }

        const upVotes = Number(stats.up_votes);
        const downVotes = Number(stats.down_votes);
        const totalVotes = upVotes + downVotes;

        if (totalVotes > 50) {
            const downVotesPercent = (downVotes / totalVotes) * 100;

            if (downVotesPercent > 75) {
                await db.query(
                    `UPDATE potholes
                    SET status = 'fixed',
                    updated_at = CURRENT_TIMESTAMP
                    WHERE id = $1;`,
                    [potholeId]
                );
            }
        }

        const lowRatings = Number(stats.low_ratings);
        const mediumRatings = Number(stats.medium_ratings);
        const highRatings = Number(stats.high_ratings);
        let severityLevel: "low" | "medium" | "high" = "low";

        if (mediumRatings >= lowRatings && mediumRatings >= highRatings) {
            severityLevel = "medium";
        }

        if (highRatings >= lowRatings && highRatings >= mediumRatings) {
            severityLevel = "high";
        }

        await db.query(
            `UPDATE potholes
            SET severity_level = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2;`,
            [severityLevel, potholeId]
        );

    } catch (error) {
        console.error("Error while evaluating pothole => ", error);
    }
}