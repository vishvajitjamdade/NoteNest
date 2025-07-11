import { useState } from "react";

function NoteForm({ onAddNote }) {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (text.trim()) {
      const newNote = {
        id: Date.now(),
        text: text,
        date: new Date().toLocaleDateString(), // Add date to note
      };

      try {
        const response = await fetch("http://localhost:3000/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("✅ Note saved to backend:", result);
          onAddNote(result); // Still add note to local state/UI
          setText(""); // Clear input
        } else {
          console.error("❌ Failed to save note.");
        }
      } 
      catch (err) {
        console.error("🚨 Error connecting to backend:", err);
      }
    }
  };

  return (
    <div className="note-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
      />
      <button onClick={handleSubmit}>Add Note</button>
    </div>
  );
}

export default NoteForm;
