import { getSession } from "next-auth/react";
import db from "../../../lib/db";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const session = await getSession({ req });

  // if (!session || session.user.role !== 'manager') {
  //   return res.status(403).json({ message: 'Forbidden' });
  // }

  try {
    switch (req.method) {
      case "GET": {
        const [users] = await db.query("SELECT * FROM users");
        return res.status(200).json({ users });
      }

      case "POST": {
        const { username, password, role } = req.body;
        if (!username || !password || !role) {
          return res.status(400).json({ error: "Username, password, and role are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [username, hashedPassword, role]);
        return res.status(201).json({ message: "User created successfully" });
      }

      case "PUT": {
        const { id, username: updatedUsername, password: updatedPassword, role: updatedRole } = req.body;
        if (!id || !updatedUsername || !updatedPassword || !updatedRole) {
          return res.status(400).json({ error: "ID, username, password, and role are required" });
        }

        const hashedPassword = await bcrypt.hash(updatedPassword, 10);
        await db.query("UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?", [updatedUsername, hashedPassword, updatedRole, id]);
        return res.status(200).json({ message: "User updated successfully" });
      }

      case "DELETE": {
        const { id: deletedId } = req.body;
        if (!deletedId) {
          return res.status(400).json({ error: "User ID is required" });
        }

        await db.query("DELETE FROM users WHERE id = ?", [deletedId]);
        return res.status(200).json({ message: "User deleted successfully" });
      }

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error("Error managing users:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
