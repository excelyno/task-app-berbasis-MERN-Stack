import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../api/axios.js";

// HAPUS import { Children } from "react"; (Tidak perlu)

export const AuthContext = createContext();

// FIX 1: Ubah ({Children}) menjadi ({children}) -> Huruf kecil 'c'
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const navigate = useNavigate();
    
    //fungsi login 
    const login = async (email, password) => {
        try{
            const { data } = await api.post("/auth/login", {email, password})

            //simpan data
            localStorage.setItem("token", data.token)
            setToken(data.token)
            setUser(data) 

            toast.success("Login Berhasil!")
            navigate("/dashboard") 
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Login Gagal")
        }
    }

    //fungsi untuk logout
    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setUser(null)
        navigate("/login")
        toast.success("Anda telah logout")
    }

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {/* FIX 2: Ubah {Children} menjadi {children} -> Huruf kecil 'c' */}
            {children}
        </AuthContext.Provider>
    )
}