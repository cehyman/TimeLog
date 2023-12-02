// pages/login.js
import { useState } from 'react';
import Router from 'next/router';
import styles from '../styles/login.module.css'; // Make sure to create this CSS module

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mock authentication logic - replace this with your actual authentication logic
        if(username === 'admin' && password === 'password') {
            // Redirect to home page or dashboard upon successful login
            Router.push('/');
        } else {
            setError('Invalid username or password');
        }
    };

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
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
