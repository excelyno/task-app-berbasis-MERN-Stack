import express from "express";
import { createCard } from "../controllers/cardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCard)

export default router