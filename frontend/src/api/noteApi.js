// src/api/noteApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // small timeout for faster failure
});

// Get all notes 
export const fetchNotes = (search = "") =>
  api.get("/api/notes", {
    params: search ? { search } : {},
  });

// Create note
export const createNote = (noteData) =>
  api.post("/api/notes", noteData);

// Update note
export const updateNote = (id, noteData) =>
  api.put(`/api/notes/${id}`, noteData);

// Delete note
export const deleteNote = (id) =>
  api.delete(`/api/notes/${id}`);
