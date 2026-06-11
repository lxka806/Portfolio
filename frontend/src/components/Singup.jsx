import { useState } from "react";

function Singup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL + "/api/auth/register";

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Signup failed. Please try again.");
                return;
            }

            setMessage("Signup successful!");
            setEmail("");
            setPassword("");
        } catch (err) {
            console.error("Signup request failed", err);
            setError("Unable to submit signup. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <h1>Signup</h1>
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
            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default Singup;