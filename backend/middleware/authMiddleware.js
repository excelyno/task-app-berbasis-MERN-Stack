import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protect = async (req, res, next) => {
    let token;

    //cek apkah ada header authorization yang diawali bearer
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            // ambil tokennya saja , buang kata " bearernya"
            token = req.headers.authorization.split(" ")[1];
            //decode token menggunakan secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // cari user berdasarkan id di token tapi jangan ambil passwordnya
            //simpan data user ke dalam object "req.user" agar bisa dipakai di controller
            req.user = await User.findById(decoded.id).select("-password")
            next() // kita lanjutkan ke function berikutnya (controller)
    } catch (error) {
        console.error(error);
        res.status(401).json({message: "not authorized, token failed"})
    }
}
if (!token){
    res.status(401).json({message: "not authorized, no token"})
}
}