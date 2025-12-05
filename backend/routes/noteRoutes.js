const express = require("express");
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

router.route("/")
  .get(getNotes)   // GET /api/notes
  .post(createNote); // POST /api/notes

router.route("/:id")
  .get(getNoteById) // GET /api/notes/:id
  .put(updateNote)  // PUT /api/notes/:id
  .delete(deleteNote); // DELETE /api/notes/:id

module.exports = router;
