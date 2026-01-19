import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // Perhatikan ekstensi .js wajib di ES Modules
import authRoutes from "./routes/authRoutes.js"
import boardRoutes from "./routes/boardRoutes.js"
import listRoutes from "./routes/listRoutes.js"
import cardRoutes from "./routes/cardRoutes.js"
import noteRoutes from "./routes/noteRoutes.js"

// 1. Load Config
dotenv.config();

// 2. Connect to Database
connectDB();

const app = express();

// 3. Middlewares
app.use(cors());
app.use(express.json()); // Agar bisa membaca body request (JSON)

app.use("/api/auth", authRoutes)
app.use("/api/boards", boardRoutes)
app.use("/api/lists", listRoutes)
app.use("/api/cards", cardRoutes)
app.use("/api/notes", noteRoutes)


app.get("/", (req, res) => {
  res.send("API TaskFlow is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});