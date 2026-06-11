const Auth = require("../model/Auth")

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();

        if (!normalizedEmail || !password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const existingUser = await Auth.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ message: "Email is already registered" });
        }

        const newUser = await Auth.create({ email: normalizedEmail, password });
        return res.status(201).json({ message: "User registered successfully", user: { id: newUser._id, email: newUser.email } });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();

        if (!normalizedEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }

        const user = await Auth.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = user.signToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};

module.exports = {
    register,
    login,
    logout
};