// pages/api/clock.js
import db from '../../lib/db'; // Adjust the path to your db.js file

export default async (req, res) => {
    if (req.method === 'POST') {
        // Existing POST request logic
        const { clockInTime, type, userId } = req.body;

        try {
            if (type === 'clock-in') {
                // Insert clock-in time
                await db.query(
                    'INSERT INTO time_logs (user_id, clock_in) VALUES (?, ?)',
                    [userId, clockInTime]
                );
                res.status(200).json({ message: 'Clock-in time logged successfully' });
            } else if (type === 'clock-out') {
                // Update clock-out time
                await db.query(
                    'UPDATE time_logs SET clock_out = ? WHERE user_id = ? AND clock_out IS NULL',
                    [clockInTime, userId]
                );
                res.status(200).json({ message: 'Clock-out time logged successfully' });
            } else {
                res.status(400).json({ message: 'Invalid type' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while logging time' });
        }
    } else if (req.method === 'GET') {
        try {
            // Fetch the last 5 entries ordered by clock_in time in descending order
            const results = await db.query(
                'SELECT * FROM time_logs ORDER BY clock_in DESC'
            );

            // Directly return the results from the database
            res.status(200).json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching time logs' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
};
