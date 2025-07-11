function NoteCard({ note, onEdit, onDelete, onShow }) {
  // Get a preview (first 5 words of the note)
  const preview =
    note.text && note.text.trim().length > 0
      ? note.text.trim().split(/\s+/).slice(0, 5).join(" ") +
        (note.text.trim().split(/\s+/).length > 5 ? "..." : "")
      : "No preview available";

  return (
    <div className="note-card">
      {/* 📝 Preview of note */}
      <p className="note-preview">{preview}</p>

      {/* 📅 Date */}
      <span className="note-date">{note.date}</span>

      {/* Buttons */}
      <div className="note-actions">
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note._id)}>Delete</button>
        <button onClick={() => onShow(note)}>Show</button>
      </div>
    </div>
  );
}

export default NoteCard;
