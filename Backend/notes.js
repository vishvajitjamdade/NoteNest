// Temporary in-memory storage
let notes = [];

// Add a new note
function addNote(note) {
  notes.push(note);
}

// Get all notes
function getAllNotes() {
  return notes;
}

// Export functions to be used in index.js
module.exports = {
  addNote,
  getAllNotes,
};