import express from "express";
import { getNotes, createNote, updateNote ,deleteNote } from "../controllers/noteController.js";
// Kita butuh protect middleware biar orang gak bisa maling note orang lain
import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// Kalau ada request ke '/' (maksudnya /api/notes)
router.route("/")
    .get(protect, getNotes)    // GET: Ambil data (harus login)
    .post(protect, createNote); // POST: Buat data (harus login)

// Kalau ada request ke '/:id' (maksudnya /api/notes/ID_TERTENTU)
router.route("/:id")
    .delete(protect, deleteNote) // DELETE: Hapus data (harus login)
    .put(protect, updateNote)

export default router;