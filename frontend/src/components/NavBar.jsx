import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context.jsx";
import AuthModal from "./AuthModal";

function NavBar() {
    const { user, logout } = useContext(AuthContext);
    const [showAuthModal, setShowAuthModal] = useState(false);

    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/skills">Skills</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    {user?.role === "admin" && <li><Link to="/admin">Admin</Link></li>}
                    {!user ? (
                        <li>
                            <button type="button" onClick={() => setShowAuthModal(true)} className="nav-auth-button">
                                Login / Sign Up
                            </button>
                        </li>
                    ) : (
                        <li>
                            <button type="button" onClick={logout} className="nav-logout-button">
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
            <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    );
}

export default NavBar;