// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../lib/db";
import bcrypt from "bcrypt";

export default NextAuth({
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;

        try {
          const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
          if (users.length > 0) {
            const user = users[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
              return { id: user.id, name: user.username, role: user.role };
            }
            throw new Error("Invalid credentials");
          }
          throw new Error("User not found");
        } catch (error) {
          throw new Error("Authentication error");
        }
      },
    }),
  ],
  session: {
    jwt: true, // If you're using JWT for session (optional)
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = session.user || {};
        session.user.id = token.userId;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
