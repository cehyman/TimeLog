// pages/api/register.js
import bcrypt from 'bcrypt';
import db from '../../lib/db'; // Adjust the path to your db.js file

export default async (req, res) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        try {
            // Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Save the user in the database
            // Adjust the query according to your database schema
            await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            // Handle errors like duplicate username, etc.
            res.status(500).json({ message: 'An error occurred while registering the user' });
        }
    } else {
        // Only POST method is allowed
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
};
