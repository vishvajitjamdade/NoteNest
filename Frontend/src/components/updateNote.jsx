
// Update note handler
const handleUpdateNote = async (editingNote, setNotes, notes, setEditingNote) => {
  try {
    const response = await fetch(`http://localhost:3000/notes/${editingNote._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: editingNote.text,
        date: new Date().toLocaleDateString(), // Optional: update date
      }),
    });

    if (response.ok) {
      const updated = await response.json();
      setNotes(notes.map((n) => (n._id === updated._id ? updated : n)));
      setEditingNote(null); // close modal
    } else {
      console.error('❌ Failed to update note');
    }
  } catch (err) {
    console.error('🚨 Error updating note:', err);
  }
};

export default handleUpdateNote;