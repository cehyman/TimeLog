// pages/api/activity.js
import db from '../../lib/db'; // Adjust the path to your db.js file

export default async (req, res) => {
    if (req.method !== 'GET') {
        // Reject non-GET requests
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    const userId = req.query.userId;
    if (!userId) {
        // User ID is required
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const [result] = await db.query(
            'SELECT * FROM time_logs WHERE user_id = ? ORDER BY clock_in DESC LIMIT 5',
            [userId]
        );

        if (result.length > 0) {
            res.status(200).json({ data: result });
        } else {
            res.status(404).json({ error: 'No time logs found for the user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving time logs' });
    }
};
