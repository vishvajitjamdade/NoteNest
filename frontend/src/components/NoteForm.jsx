import React, { useEffect, useState } from "react";

const emptyForm = {
    title: "",
    content: "",
    tags: "",
    pinned: false,
};

const NoteForm = ({ onSubmit, loading, editingNote, onCancelEdit }) => {
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        if (editingNote) {
            setForm({
                title: editingNote.title || "",
                content: editingNote.content || "",
                tags: editingNote.tags ? editingNote.tags.join(", ") : "",
                pinned: editingNote.pinned ?? false,
            });
        } else {
            setForm(emptyForm);
        }
    }, [editingNote]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const tagsArray =
            form.tags.trim() === ""
                ? []
                : form.tags.split(",").map((t) => t.trim());

        onSubmit({ ...form, tags: tagsArray });

        // RESET FORM AFTER SUBMIT (only if not editing)
        if (!editingNote) setForm(emptyForm);
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-6 bg-white/60 dark:bg-[#161b22]/70 shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur"
        >
            <div className="mb-5 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {editingNote ? "Edit Note" : "Create a new note"}
                </h2>

                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <input
                        type="checkbox"
                        name="pinned"
                        checked={form.pinned}
                        onChange={handleChange}
                        className="h-4 w-4"
                    />
                    Pinned
                </label>
            </div>

            <input
                type="text"
                name="title"
                placeholder="Note title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full mb-4 rounded-xl bg-white dark:bg-[#0d1117] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 px-4 py-2 shadow focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
                name="content"
                placeholder="Write your note..."
                value={form.content}
                onChange={handleChange}
                rows={4}
                className="w-full mb-4 rounded-xl bg-white dark:bg-[#0d1117] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 px-4 py-2 shadow focus:ring-2 focus:ring-indigo-500"
            />

            <input
                type="text"
                name="tags"
                placeholder="Tags (comma separated)"
                value={form.tags}
                onChange={handleChange}
                className="w-full mb-6 rounded-xl bg-white dark:bg-[#0d1117] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 px-4 py-2 shadow focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex justify-between items-center">
                {editingNote && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="text-sm text-gray-500 dark:text-gray-300 underline"
                    >
                        Cancel
                    </button>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md disabled:bg-indigo-400 transition"
                >
                    {loading ? "Saving..." : editingNote ? "Update Note" : "Add Note"}
                </button>
            </div>
        </form>
    );
};

export default NoteForm;
