// pages/api/signin.js

import db from '../../lib/db'; // Adjust the path to your db.js file

export default async (req, res) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        try {
            const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
            
            if (rows.length > 0) {
                // User authenticated successfully
                // You can also implement session or token generation here
                res.status(200).json({ message: 'Login successful' });
            } else {
                // User authentication failed
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while trying to log in' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
};

