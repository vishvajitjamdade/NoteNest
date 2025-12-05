import React from "react";

const NoteCard = ({ note, onEdit, onDelete }) => {
  const created = new Date(note.createdAt);
  const updated = new Date(note.updatedAt);
  const isUpdated = updated.getTime() - created.getTime() > 3000;

  return (
    <div className="rounded-2xl p-5 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {note.title}
        </h3>

        {note.pinned && (
          <span className="px-2 py-1 text-xs rounded-full bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-yellow-200">
            PINNED
          </span>
        )}
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-wrap">
        {note.content}
      </p>

      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        Created: {created.toLocaleString()}
        {isUpdated && <div>Updated: {updated.toLocaleString()}</div>}
      </div>

      <div className="flex gap-4 text-sm">
        <button
          onClick={() => onEdit(note)}
          className="text-indigo-600 dark:text-indigo-300 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(note._id)}
          className="text-red-600 dark:text-red-400 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
