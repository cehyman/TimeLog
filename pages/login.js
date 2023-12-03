// pages/login.js
import { useState } from "react";
import Router from "next/router";
import { signIn } from "next-auth/react";
import Register from "../components/registerwindow";
import styles from "../styles/login.module.css"; // Make sure to create this CSS module

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Using Next-Auth's signIn method for authentication
    const result = await signIn("credentials", {
      redirect: false, // Prevents automatic redirection after sign in
      username,
      password,
    });

    if (result.error) {
      // Update the error state if there is an error
      setError(result.error);
    } else {
      // Redirect the user on successful login
      Router.push("/");
    }
  };

  // State to control the visibility of the Register modal
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h1>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className={styles.buttonContainer}>
          <button type="submit">Login</button>
          {/* Register button now appears below the login button */}
          <button onClick={() => setShowRegister(true)}>Register</button>
        </div>
      </form>

      {/* Render the Register component as a modal */}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </div>
  );
};

export default Login;
