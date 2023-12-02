import React, { useState } from 'react';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Reset error message
        setErrorMessage('');

        // Example validation
        if (!username || !password) {
            setErrorMessage('Username and password are required');
            return;
        }

        // Authentication logic here
        // This should be replaced with an API call to your authentication service
        try {
            // const response = await yourAuthService.login(username, password);
            // Handle successful login here
        } catch (error) {
            // Handle login failure here
            setErrorMessage('Failed to log in');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
