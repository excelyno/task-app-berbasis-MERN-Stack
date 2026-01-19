import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

//@desc     Register user baru
//@route    POST /api/auth/register
//@access   Public

export const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        //cek apakah user sudah ada
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({message: "user aleady exists"})
        }

        // buat user baru (password otomatis di hash oleh model barusan)

        const user = await User.create({
            username,
            email,
            password,
        })

        // response jika sukses
        if(user){
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id) // sertakan saja tokennya
            })
        } else {
            res.status(400).json({message: "invalid user data"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


// @desc    Login user & get token
// @route POST /api/auth/login
// @access  public

export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body
        //mencari user berdasarkan email

        const user = await User.findOne({ email })

        // check user ada dan password cocok ( menggunakan method yang kita buat di model)
        if(user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            })
        }else {
            res.status(401).json({message: "Invalid email or password"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}