import db from '../../lib/db';
import bcrypt from 'bcrypt';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        try {
            const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            
            if (users.length > 0) {
                const user = users[0];
                const match = await bcrypt.compare(password, user.password);

                if (match) {
                    // User authenticated successfully
                    // Implement session or token generation here
                    res.status(200).json({ message: 'Login successful' });
                } else {
                    // Passwords do not match
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            } else {
                // User not found
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while trying to log in' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
};

