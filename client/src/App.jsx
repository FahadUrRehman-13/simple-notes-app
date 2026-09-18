import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/notes";

function App() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    /*
        Fetch all notes when the component
        is mounted for the first time.
    */
    useEffect(() => {
        fetchNotes();
    }, []);


    /*
        GET /api/notes
    */
    const fetchNotes = async () => {
        try {
            setLoading(true);

            const response = await axios.get(API_URL);

            setNotes(response.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false);
        }
    };


    /*
        POST /api/notes
    */
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert("Please enter both title and content.");
            return;
        }

        try {
            const response = await axios.post(API_URL, {
                title,
                content
            });

            /*
                Add the newly-created note to
                the beginning of the current state.
            */
            setNotes((previousNotes) => [
                response.data,
                ...previousNotes
            ]);

            // Clear form
            setTitle("");
            setContent("");

        } catch (error) {
            console.error("Error creating note:", error);

            alert("Failed to create note.");
        }
    };


    /*
        DELETE /api/notes/:id
    */
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);

            /*
                Remove the deleted note from
                React state immediately.
            */
            setNotes((previousNotes) =>
                previousNotes.filter((note) => note._id !== id)
            );

        } catch (error) {
            console.error("Error deleting note:", error);

            alert("Failed to delete note.");
        }
    };


    return (
        <div className="app-container">

            <header>
                <h1>Student Notes</h1>

                <p>
                    A simple MERN stack notes application
                </p>
            </header>


            <section className="form-section">

                <h2>Add a Note</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="title">
                            Title
                        </label>

                        <input
                            id="title"
                            type="text"
                            placeholder="Enter note title"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="content">
                            Content
                        </label>

                        <textarea
                            id="content"
                            rows="5"
                            placeholder="Enter note content"
                            value={content}
                            onChange={(event) =>
                                setContent(event.target.value)
                            }
                        />
                    </div>


                    <button type="submit">
                        Add Note
                    </button>

                </form>

            </section>


            <section className="notes-section">

                <h2>Your Notes</h2>


                {loading ? (

                    <div className="message">
                        Loading notes...
                    </div>

                ) : notes.length === 0 ? (

                    <div className="message">
                        No notes yet — add one above!
                    </div>

                ) : (

                    <div className="notes-list">

                        {notes.map((note) => (

                            <article
                                className="note-card"
                                key={note._id}
                            >

                                <div className="note-content">

                                    <h3>
                                        {note.title}
                                    </h3>

                                    <p>
                                        {note.content}
                                    </p>

                                    <small>
                                        Created:{" "}
                                        {new Date(
                                            note.createdAt
                                        ).toLocaleString()}
                                    </small>

                                </div>


                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        handleDelete(note._id)
                                    }
                                >
                                    Delete
                                </button>

                            </article>

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
}

export default App;