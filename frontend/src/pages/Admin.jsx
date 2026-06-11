import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";

const API_URL = import.meta.env.VITE_API_URL + "/api";

function Admin() {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        description: "",
        image: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.token) {
            alert("You must be logged in to add a website.");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/websites`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to add website.");
            }

            alert("Website added successfully!");

            setFormData({
                name: "",
                url: "",
                description: "",
                image: "",
            });
        } catch (error) {
            console.error(error);
            alert(error.message || "Unable to add website.");
        }
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <p>Add a new website</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Website Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="url"
                    name="url"
                    placeholder="https://example.com"
                    value={formData.url}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Website Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <input
                    type="url"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Add Website</button>
            </form>
        </div>
    );
}

export default Admin;
