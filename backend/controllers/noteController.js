const Note = require("../models/Note");


const getNotes = async (req, res, next) => {
    try {
        const { search } = req.query;

        let query = {};
        let projection = null;
        let sort = { updatedAt: -1 };

        if (search && search.trim() !== "") {
            // Use text search – uses the index we created
            query = { $text: { $search: search.trim() } };
            projection = { score: { $meta: "textScore" } };
            sort = { score: { $meta: "textScore" } };
        }

        const notes = await Note.find(query, projection).sort(sort).lean();

        res.status(200).json({
            success: true,
            count: notes.length,
            data: notes,
        });
    } catch (error) {
        next(error);
    }
};

// @desc   Get single note by id
// @route  GET /api/notes/:id
const getNoteById = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id).lean();

        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        res.status(200).json({ success: true, data: note });
    } catch (error) {
        next(error);
    }
};

// @desc   Create new note
// @route  POST /api/notes
const createNote = async (req, res, next) => {
    try {
        const { title, content, tags, pinned } = req.body;

        if (!title || title.trim() === "") {
            return res
                .status(400)
                .json({ success: false, message: "Title is required" });
        }

        const note = await Note.create({
            title: title.trim(),
            content: content || "",
            tags: Array.isArray(tags) ? tags : [],
            pinned: !!pinned,
        });

        res.status(201).json({ success: true, data: note });
    } catch (error) {
        next(error);
    }
};

// @desc   Update note
// @route  PUT /api/notes/:id
const updateNote = async (req, res, next) => {
    try {
        const { title, content, tags, pinned } = req.body;

        const updatedFields = {};
        if (typeof title !== "undefined") updatedFields.title = title.trim();
        if (typeof content !== "undefined") updatedFields.content = content;
        if (typeof tags !== "undefined")
            updatedFields.tags = Array.isArray(tags) ? tags : [];
        if (typeof pinned !== "undefined") updatedFields.pinned = !!pinned;

        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        res.status(200).json({ success: true, data: note });
    } catch (error) {
        next(error);
    }
};

// @desc   Delete note
// @route  DELETE /api/notes/:id
const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
};
