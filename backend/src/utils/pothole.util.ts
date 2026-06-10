import { db } from "../configs/db.config.js";


export async function evaluatePothole(potholeId: string) {
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
    }
}

export async function getNearbyPotholes(
    latitude: number, longitude: number, radius: number = 100, count?: number
) {
    let query =
        `SELECT * FROM (
            SELECT *,
                FLOOR(
                    6371000 
                    * acos(
                        cos(radians($1))
                        * cos(radians(latitude))
                        * cos(radians(longitude) - radians($2))
                        + sin(radians($1))
                        * sin(radians(latitude))
                    )
                ) AS distance
            FROM potholes
        ) AS nearby_potholes
        WHERE distance < $3
        ORDER BY distance`;

    const values = [latitude, longitude, radius];

    if (count) {
        query += ` LIMIT $4;`;
        values.push(count);
    }

    const getNearbyPotholesResult = await db.query(query, values);

    return getNearbyPotholesResult.rows;
}

export function calculateDirection(fromLat: number, fromLng: number, toLat: number, toLng: number) {
    const degToRad = Math.PI / 180;
    const radToDeg = 180 / Math.PI;

    const fromLatRad = fromLat * degToRad;
    const toLatRad = toLat * degToRad;
    const lngDiff = (toLng - fromLng) * degToRad;

    const y = Math.sin(lngDiff) * Math.cos(toLatRad);
    const x = Math.cos(fromLatRad)
        * Math.sin(toLatRad)
        - Math.sin(fromLatRad)
        * Math.cos(toLatRad)
        * Math.cos(lngDiff);

    const bearing = Math.atan2(y, x) * radToDeg;
    const normalisedAngle = (bearing + 360) % 360;

    return normalisedAngle;
}

export function angleDifference(a: number, b: number) {
    let diff = Math.abs(a - b);
    return Math.min(diff, 360 - diff);
}