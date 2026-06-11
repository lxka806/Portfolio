import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context.jsx";

function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL + "/api/auth/login";

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();
            setError(data.message)

            if (!res.ok) {
                setError(data.message || "Login failed. Check email and password.");
                return;
            }

            login({ token: data.token, email: data.user.email, role: data.user.role });
        } catch (err) {
            console.error("Login request failed", err);
            setError("Unable to submit login. Please try again.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>

            <input
                name="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">Login</button>
        </form>
    );
}

export default Login;