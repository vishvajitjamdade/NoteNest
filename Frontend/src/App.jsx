import { useState, useEffect } from "react";
import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import "./index.css";
import handleUpdateNote from "./components/updateNote"; // ✅ export it as named

function App() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setEditingNote(null);
        setViewingNote(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);


  const fetchNotesFromDB = async () => {
    try {
      const res = await fetch("http://localhost:3000/notes");
      const data = await res.json();
      setNotes(data);
      console.log("✅ Notes fetched from DB:", data);
    } catch (err) {
      console.error("❌ Error fetching notes:", err);
    }
  };

  const addNote = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  const deleteNote = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/notes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("🗑️ Note deleted from DB");
        // Update UI after deletion
        setNotes(notes.filter((note) => note._id !== id));
      } else {
        console.error("❌ Failed to delete note");
      }
    } catch (error) {
      console.error("🚨 Error deleting note:", error);
    }
  };


  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* 👇 Animated wave background */}
      <ThemeToggle darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />
      <h1>SmartNotes 📝</h1>
      <SearchBar onSearch={setSearchText} />
      <NoteForm onAddNote={addNote} />

      <button onClick={fetchNotesFromDB} style={{ marginBottom: "10px", padding: "8px" }}>
        📋 Show Notes
      </button>

      <div className="notes-grid">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={handleEdit}
            onDelete={deleteNote}
            onShow={setViewingNote}
          />
        ))}
      </div>

      {/* ✅ Edit Modal */}
      {editingNote && (
        <div className="modal-overlay" onClick={() => setEditingNote(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <h3>Edit Note</h3>
            <textarea
              value={editingNote.text}
              onChange={(e) =>
                setEditingNote({ ...editingNote, text: e.target.value })
              }
              style={{ width: "100%", height: "100px", marginBottom: "10px" }}
            />
            <div className="modal-actions">
              <button
                onClick={() =>
                  handleUpdateNote(editingNote, setNotes, notes, setEditingNote)
                }
              >
                💾 Save
              </button>
              <button onClick={() => setEditingNote(null)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
      {editingNote && (
        <div className="modal-overlay" onClick={() => setEditingNote(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <h3>Edit Note</h3>
            <textarea
              value={editingNote.text}
              onChange={(e) =>
                setEditingNote({ ...editingNote, text: e.target.value })
              }
              style={{ width: "100%", height: "100px", marginBottom: "10px" }}
            />
            <div className="modal-actions">
              <button
                onClick={() =>
                  handleUpdateNote(editingNote, setNotes, notes, setEditingNote)
                }
              >
                💾 Save
              </button>
              <button onClick={() => setEditingNote(null)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* 👁️ Show Note Modal */}
      {viewingNote && (
        <div className="modal-overlay" onClick={() => setViewingNote(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Note Content</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>{viewingNote.text}</p>
            <p><small>📅 {viewingNote.date}</small></p>
            <div className="modal-actions">
              <button onClick={() => setViewingNote(null)}>❌ Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
