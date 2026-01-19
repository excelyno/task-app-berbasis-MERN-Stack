import mongoose, { mongo } from "mongoose";

const boardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    background: {
        type: String,
        default: "#ffffff"
    },
    lists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }]
}, {timestamps: true});

export default mongoose.model("Board", boardSchema);