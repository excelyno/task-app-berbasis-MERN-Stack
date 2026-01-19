import Note from "../models/Note.js";

// @desc    Get notes
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
  // --- MULAI DEBUG ---
  console.log("=== DEBUG GET NOTES ===");
  console.log("1. User yang login (req.user):", req.user);
  console.log("2. ID yang dipakai mencari (req.user.id):", req.user.id);
  console.log("3. Tipe data ID:", typeof req.user.id);
  
  // Coba cari TANPA filter dulu untuk melihat apakah koneksi DB sehat
  const allNotes = await Note.find({});
  console.log("4. Total semua notes di DB (tanpa filter):", allNotes.length);
  // --- SELESAI DEBUG ---

  // Kode asli Anda
// Urutkan berdasarkan isPinned (descending/true dulu) LALU createdAt (terbaru dulu)
const notes = await Note.find({ user: req.user.id }).sort({ isPinned: -1, createdAt: -1 });
  console.log("5. Hasil pencarian spesifik:", notes); // Lihat apa hasilnya
  
  res.status(200).json(notes);
};

// @desc    Create note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(400);
    throw new Error("Please add title and content");
  }

  const note = await Note.create({
    title: req.body.title,
    content: req.body.content,
    user: req.user.id, // Ambil ID dari token user yang login
  });

  res.status(200).json(note);
};


// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  // Cek apakah user yang mau edit adalah pemilik note
  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Update data
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    req.body, // Data baru (title, content)
    { new: true } // Return data terbaru setelah update
  );

  res.status(200).json(updatedNote);
};


// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  // Pastikan yang menghapus adalah pemilik note itu sendiri
  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await note.deleteOne();

  res.status(200).json({ id: req.params.id });
};

export { getNotes, createNote, updateNote , deleteNote };