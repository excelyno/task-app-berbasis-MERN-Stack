import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Untuk notifikasi popup
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";


function App() {
  return (
    <>
      {/* Toaster untuk menampilkan pesan sukses/gagal */}
      <AuthProvider>  
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;