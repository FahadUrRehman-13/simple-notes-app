const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

const PORT = 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);

// Simple test route
app.get("/", (req, res) => {
    res.send("Notes API is running");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});