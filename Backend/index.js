const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db'); //  Import the DB connection
// const Note = require('./models/Note'); 
const Note = require('./Note'); // Mongoose model

const port = 3000;

const { addNote, getAllNotes } = require('./notes'); // import functions

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  console.log('Hello World!');
});

// POST: Save note to MongoDB
app.post('/notes', async (req, res) => {
  const { text, date } = req.body;

  try {
    const newNote = new Note({ text, date });
    const savedNote = await newNote.save();
    console.log("📦 Note saved to MongoDB:", savedNote);
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("❌ Failed to save note:", error);
    res.status(500).json({ error: "Server Error" });
  }
});


// GET: Fetch notes from MongoDB
app.get('/notes', async (req, res) => {
  try {
    const allNotes = await Note.find(); // ✅ Use MongoDB
    res.json(allNotes);
  } catch (error) {
    console.error("❌ Failed to fetch notes:", error);
    res.status(500).json({ error: "Server Error" });
  }
});


const startServer = async () => {
  try {
    await connectDB(); // Wait for MongoDB to connect
    app.listen(port, () => {
      console.log(`🚀 App is listening on port : ${port}`);
    });
  } catch (err) {
    console.error('⛔ Server startup aborted due to DB connection failure.');
    process.exit(1);
  }
};

// PUT: Update a note by ID
app.put('/notes/:id', async (req, res) => {
  const { text, date } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { text, date },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    console.log("✏️ Note updated:", updatedNote);
    res.json(updatedNote);
  } catch (error) {
    console.error("❌ Failed to update note:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// DELETE: Remove note from MongoDB by ID
app.delete('/notes/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    console.log('🗑️ Note deleted:', deletedNote);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting note:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


startServer();