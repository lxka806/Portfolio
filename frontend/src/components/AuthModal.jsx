import { useEffect, useState, useRef } from "react";
import Login from "./Login";
import SingUp from "./Singup";
import "./AuthModal.css";

function AuthModal({ open = false, onClose }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("login");
    const [isVisible, setIsVisible] = useState(false);
    const overlayRef = useRef(null);

    useEffect(() => {
        const hasSeenModal = localStorage.getItem("authModalShown") === "true";

        if (!hasSeenModal) {
            setIsOpen(true);
            setIsVisible(true);
        }
    }, []);

    useEffect(() => {
        if (open) {
            setIsVisible(true);
            setIsOpen(true);
        }
    }, [open]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const closeModal = () => {
        localStorage.setItem("authModalShown", "true");
        setIsOpen(false);
        setTimeout(() => setIsVisible(false), 250);
        if (onClose) onClose();
    };

    const handleOverlayClick = (event) => {
        if (event.target === overlayRef.current) {
            closeModal();
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div
            ref={overlayRef}
            className={`auth-modal-overlay ${isOpen ? "open" : "closing"}`}
            onClick={handleOverlayClick}
        >
            <div className={`auth-modal ${isOpen ? "open" : "closing"}`} role="dialog" aria-modal="true">
                <button className="auth-modal-close" onClick={closeModal} aria-label="Close auth modal">
                    ×
                </button>

                <div className="auth-modal-header">
                    <div>
                        <p className="auth-modal-subtitle">Welcome back</p>
                    </div>
                    <div className="auth-modal-tabs">
                        <button
                            className={activeTab === "login" ? "active" : ""}
                            type="button"
                            onClick={() => setActiveTab("login")}
                        >
                            Login
                        </button>
                        <button
                            className={activeTab === "signup" ? "active" : ""}
                            type="button"
                            onClick={() => setActiveTab("signup")}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                <div className="auth-modal-body">
                    {activeTab === "login" ? <Login /> : <SingUp />}
                </div>
            </div>
        </div>
    );
}

export default AuthModal;
