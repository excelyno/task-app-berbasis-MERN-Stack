import express from "express";
import { getBoards, createBoard, getBoardById} from "../controllers/boardController.js";
import { protect } from "../middleware/authMiddleware.js"; // Import Middleware

const router = express.Router();

// Terapkan 'protect' di sini. Semua route di bawah ini jadi Private.
router.route("/")
  .get(protect, getBoards)
  .post(protect, createBoard);

router.route("/:id")
.get(protect, getBoardById)

export default router;