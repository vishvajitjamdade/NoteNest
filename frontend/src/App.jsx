import React from "react";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Spinner from "./components/Spinner";
import { fetchNotes, createNote, updateNote, deleteNote } from "./api/noteApi";
import './App.css'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [error, setError] = useState("");

  // Load notes (with optional search)
  const loadNotes = async (searchTerm = "") => {
    try {
      setError("");
      setLoadingList(true);
      const res = await fetchNotes(searchTerm);
      setNotes(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load notes. Please check backend.");
    } finally {
      setLoadingList(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadNotes();
  }, []);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      loadNotes(search);
    }, 400); // 400ms debounce for fast feel

    return () => clearTimeout(handler);
  }, [search]);

  const handleCreateOrUpdate = async (formData) => {
    try {
      setSaving(true);
      setError("");

      if (editingNote) {
        // Update
        const res = await updateNote(editingNote._id, formData);
        const updated = res.data.data;
        setNotes((prev) =>
          prev.map((n) => (n._id === updated._id ? updated : n))
        );
        setEditingNote(null);
      } else {
        // Create
        const res = await createNote(formData);
        const created = res.data.data;
        // Put pinned at beginning for fast access
        setNotes((prev) => [created, ...prev]);
      }
    } catch (err) {
      console.error(err);
      setError("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this note permanently?");
    if (!confirmDelete) return;

    try {
      setError("");
      // Optimistic update
      setNotes((prev) => prev.filter((n) => n._id !== id));
      await deleteNote(id);
    } catch (err) {
      console.error(err);
      setError("Delete failed. Refresh and try again.");
      // Could reload notes here if needed
      loadNotes(search);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <Layout>
      <Header search={search} onSearchChange={setSearch} />

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/40 dark:border-red-700 dark:text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
        <div className="md:sticky md:top-6 md:self-start">
          <NoteForm
            onSubmit={handleCreateOrUpdate}
            loading={saving}
            editingNote={editingNote}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <div>
          {loadingList ? (
            <Spinner />
          ) : (
            <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;
