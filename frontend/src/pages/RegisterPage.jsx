import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js"; // <--- SUDAH DISESUAIKAN (arah ke api/axios.js)
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const { username, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // 1. Validasi Password
    if (password !== confirmPassword) {
      toast.error("Password dan Konfirmasi tidak sama!");
      return;
    }

    try {
      // 2. Kirim data Register ke Backend
      // Payload: username, email, password
      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      // 3. Jika sukses
      toast.success("Registrasi berhasil! Silakan login.");
      navigate("/login"); // Redirect ke halaman login
    } catch (error) {
      // Ambil pesan error dari backend
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Daftar Akun Baru
        </h2>
        
        <form onSubmit={onSubmit} className="space-y-4">
          {/* USERNAME */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Masukkan username"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="contoh@email.com"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="********"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Ulangi password"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Daftar Sekarang
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;