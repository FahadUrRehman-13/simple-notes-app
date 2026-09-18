const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

/*
    POST /api/notes

    Create a new note
*/
router.post("/", async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = new Note({
            title,
            content
        });

        const savedNote = await note.save();

        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error creating note:", error.message);

        res.status(400).json({
            message: "Failed to create note",
            error: error.message
        });
    }
});


/*
    GET /api/notes

    Return all notes,
    newest first
*/
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find().sort({
            createdAt: -1
        });

        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error.message);

        res.status(500).json({
            message: "Failed to fetch notes",
            error: error.message
        });
    }
});


/*
    DELETE /api/notes/:id

    Delete note using MongoDB _id
*/
router.delete("/:id", async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully",
            deletedNote: note
        });

    } catch (error) {
        console.error("Error deleting note:", error.message);

        res.status(500).json({
            message: "Failed to delete note",
            error: error.message
        });
    }
});

module.exports = router;