import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Relasi ke user pemilik note
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    content: {
      type: String,
      required: [true, "Please add content"],
    },
  isPinned: {
      type: Boolean,
      default: false, // Secara default, catatan tidak dipin
    },
  color:{
    type: String,
    default: "bg-white",
  }
  },
  {
    timestamps: true,
  }
);





// Parameter ke-3 adalah nama koleksi persis di MongoDB Compass
const Note = mongoose.model("Note", noteSchema, "notes"); 

export default Note;