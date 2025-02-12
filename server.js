const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Crypto = require("crypto"); // For password hashing

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const SessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
const Session = mongoose.model("Session", SessionSchema);

// Hash password function
function hashPassword(password) {
    return Crypto.createHash("sha256").update(password).digest("hex");
}

// Login endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = hashPassword(password);

    try {
        const user = await User.findOne({ email, password: hashedPassword });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = require("uuid").v4(); // Generate session token
        await Session.create({ userId: user._id, token });

        res.json({ user, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Signup endpoint
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = hashPassword(password);

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = await User.create({ email, password: hashedPassword });
        const token = require("uuid").v4(); // Generate session token
        await Session.create({ userId: newUser._id, token });

        res.json({ user: newUser, token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Logout endpoint
app.post("/logout", async (req, res) => {
    const { token } = req.body;

    try {
        await Session.deleteOne({ token });
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(3001, () => console.log("Server running on port 3001"));