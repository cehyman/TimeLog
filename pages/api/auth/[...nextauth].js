import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import db from "../../../lib/db"; // Adjust the path as necessary
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
          const [users] = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
          );
          if (users.length > 0) {
            const user = users[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
              // Return user object on successful authentication
              return { id: user.id, name: user.username, role: user.role };
            } else {
              throw new Error("Invalid credentials");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error("An error occurred during authentication");
        }
      },
    }),
    // Add other providers as needed
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // This callback is called whenever a new JWT is created. If the user object exists, it means
      // this is the time of sign-in, and we can add the user ID to the token
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // This callback is called whenever a session is checked. We add the userId from the token to the session
      session.user.id = token.userId;
      session.user.role = token.role;
      return session;
    },
  },
  // Additional Next-Auth configuration here
});
