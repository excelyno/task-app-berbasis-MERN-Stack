import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: true
    },
    //kita buat arrays card untuk menyimpan urutan kartu 
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
    }]
}, {timestamps: true});

export default mongoose.model("List", listSchema)