const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      default: "",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    pinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// Text index for fast search on title + content + tags
noteSchema.index({
  title: "text",
  content: "text",
  tags: "text",
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
