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
                    'UPDATE time_logs SET clock_out = ? WHERE clock_out IS NULL AND user_id = ?',
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
    }else if (req.method === 'GET') {
        const { userId } = req.query;
    
        try {
          // Retrieve all clock-in and clock-out records for the user today
          const [results] = await db.query(
            'SELECT clock_in, clock_out FROM time_logs WHERE user_id = ? AND DATE(clock_in) = CURDATE()',
            [userId]
          );
    
          // Retrieve all time_logs records for the user today
          const [allTimeLogs] = await db.query(
            'SELECT * FROM time_logs WHERE user_id = ? AND DATE(clock_in) = CURDATE()',
            [userId]
          );
    
          // Calculate the total time worked today
          let totalTimeWorkedTodayInSeconds = 0;
          for (const record of results) {
            const clockInTime = new Date(record.clock_in).getTime();
            const clockOutTime = record.clock_out
              ? new Date(record.clock_out).getTime()
              : new Date().getTime();
            totalTimeWorkedTodayInSeconds += (clockOutTime - clockInTime) / 1000;
          }
    
          res.status(200).json({ totalTimeWorkedTodayInSeconds, allTimeLogs });
        } catch (error) {
          console.error(error);
          // Handle specific errors like database constraints, etc.
          res.status(500).json({ message: 'An error occurred while fetching time data' });
        }
      } else {
        // Only POST and GET methods are allowed
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
};
