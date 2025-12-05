import React from "react";
import NoteCard from "./NoteCard";

const NoteList = ({ notes, onEdit, onDelete }) => {
  if (!notes.length) {
    return (
      <div className="mt-8 p-6 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-[#161b22]/60 text-center text-gray-600 dark:text-gray-300">
        No notes yet. Create one to get started ✍️
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NoteList;
