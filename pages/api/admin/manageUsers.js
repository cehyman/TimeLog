// pages/api/admin/manageUsers.js
import { getSession } from "next-auth/react";
import db from '../../../lib/db'; // Adjust the path as necessary

export default async function handler(req, res) {
    const session = await getSession({ req });

    // Only allow access to users with admin role
    if (!session || session.user.role !== 'admin') {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        switch (req.method) {
            case 'GET':
                // Fetch and return user data
                const [users] = await db.query("SELECT * FROM users");
                return res.status(200).json({ users });

            case 'POST':
                // Create a new user
                // You'll need to get user data from req.body
                // Example: const { username, password, role } = req.body;
                // Then insert data into your database
                return res.status(201).json({ message: "User created successfully" });

            case 'PUT':
                // Update an existing user
                // Similar to POST, you'll get updated user data from req.body
                return res.status(200).json({ message: "User updated successfully" });

            case 'DELETE':
                // Delete a user
                // You'll need to identify which user to delete, typically via an ID passed in req.body
                return res.status(200).json({ message: "User deleted successfully" });

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error managing users:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
