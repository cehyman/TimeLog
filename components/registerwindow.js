// components/Register.js
import { useState } from 'react';
import styles from '../styles/register.module.css'; // Make sure to create this CSS module

const Register = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert('Registration successful');
                onClose(); // Close the modal on successful registration
            } else {
                const errorMsg = await response.text();
                setError(errorMsg);
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('An error occurred during registration');
        }
    };

    return (
        <div className={styles.registerModal}>
            <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={onClose}>&times;</span>
                <form className={styles.registerForm} onSubmit={handleSubmit}>
                    <h1>Register</h1>
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
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;