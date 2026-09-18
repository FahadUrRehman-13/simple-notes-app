const mongoose = require("mongoose");

const connectDB = () => {
    mongoose
        .connect("mongodb://localhost:27017/notes_db")
        .then(() => {
            console.log("MongoDB connected successfully");
        })
        .catch((error) => {
            console.error("MongoDB connection failed:");
            console.error(error.message);
        });
};

module.exports = connectDB;