import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

userSchema.pre("save", async function (next) {
    //jika password tidak di ubah misal cuma update email saja, jangan hash ulang
    if(!this.isModified("password")){
        next();
    }

    //generate salt dan hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

//method custom untuk mencocokkan password saat login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//perhatikan syntax export default
export default mongoose.model("User", userSchema);