// pages/api/clock.js
import db from '../../lib/db'; // Adjust the path to your db.js file

export default async (req, res) => {
    if (req.method === 'POST') {
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
            // Handle specific errors like database constraints, etc.
            res.status(500).json({ message: 'An error occurred while logging time' });
        }
    } else {
        // Only POST method is allowed
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
};
