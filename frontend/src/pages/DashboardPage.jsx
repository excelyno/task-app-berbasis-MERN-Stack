import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../api/axios.js";
import toast from "react-hot-toast";

// Daftar warna (Class Tailwind)
const COLORS = [
  { name: "Putih", value: "bg-white" },
  { name: "Merah", value: "bg-red-100" },
  { name: "Kuning", value: "bg-yellow-100" },
  { name: "Hijau", value: "bg-green-100" },
  { name: "Biru", value: "bg-blue-100" },
  { name: "Ungu", value: "bg-purple-100" },
];


const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};



export default function DashboardPage() {
  const { user, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]); // Menyimpan daftar catatan
  const [title, setTitle] = useState(""); // Input Judul
  const [content, setContent] = useState(""); // Input Isi
  const [isEditing, setIsEditing] = useState(false)
  const [currentNoteId, setCurrentNoteId] = useState(null)
  const [searchQuery, setSearchQuery] = useState(""); // state untuk pencarian
const [selectedColor, setSelectedColor] = useState("bg-white"); // Default putih



  // 1. Ambil data catatan saat halaman dibuka
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await api.get("/notes");
      setNotes(data); // Simpan ke state
    } catch (error) {
      console.error("Gagal ambil notes", error);
      toast.error("Gagal memuat catatan");
    }
  };

  // 2. Fungsi Tambah Catatan
  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return toast.error("Judul dan isi harus diisi!");

    try {
      const { data } = await api.post("/notes", { title, content , color: selectedColor});
      // 1. Gabungkan note baru dengan list lama
      const updatedList = [data, ...notes];
      // 2. Urutkan ulang menggunakan helper kita
      const sortedList = sortNotes(updatedList);
      setNotes(sortedList)
      setTitle(""); // Reset form
      setContent("");
      setSelectedColor("bg-white");
      toast.success("Catatan berhasil dibuat!");
    } catch (error) {
      toast.error("Gagal membuat catatan");
    }
  };

  //fungsi update untuk note
  const handleEditClick = (note) => {
    setIsEditing(true)
    setCurrentNoteId(note._id)
    setTitle(note.title)
    setContent(note.content)
    setSelectedColor(note.color || "bg-white")
    //scroll ke atas agar user lihat formnya
    window.scrollTo({top: 0, behavior: 'smooth'})
  }
  const handleUpdateNote = async (e) => {
    e.preventDefault()
    try{
      const { data } = await api.put(`/notes/${currentNoteId}`, {title, content, color: selectedColor})
      //update states notes di layar tanpa refresh
      setNotes(notes.map((note) => (note._id === currentNoteId ? data: note)))
      toast.success("catatan anda berhasil diupdate!");

      //RESET FORM
      setIsEditing(false);
      setCurrentNoteId(null)
      setTitle("")
      setContent("")
      setSelectedColor("bg-white")
    } catch (error) {
      toast.error("gagal update catatan")
    }
  }

  // 3. Fungsi Hapus Catatan
  const handleDeleteNote = async (id) => {
    if (!window.confirm("Yakin mau hapus catatan ini?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id)); // Hapus dari layar
      toast.success("Catatan dihapus");
    } catch (error) {
      toast.error("Gagal menghapus catatan");
    }
  };

  // fungsi toggle pin atau sematkan
  const handleTogglePin = async (note) => {
    try{
      //kita kirim kebalikan dari status sekarang (!note.isPinned)
      const newStatus = !note.isPinned
      const { data } = await api.put(`/notes/${note._id}`, {
        isPinned: newStatus
      })

      // update state di layar
      const updatedNotes = notes.map((n) => (n._id === note._id ? data : n))
      setNotes(sortNotes(updatedNotes));
      // kita perlu sort ulang di front end biar langsung pindah posisi tanpa refresh
      // logikanya : pin dulu (-1), baru tanggal
      const sortedNotes = updatedNotes.sort((a,b) => {
        if (a.isPinned === b.isPinned){
          return new Date (b.createdAt) - new Date(a.createdAt)
        }
        return a.isPinned? -1 : 1
      })
      setNotes(sortedNotes)
      toast.success(newStatus ? "Catatan disematkan!" : "Sematkan dilepas")
    } catch (error){
      toast.error("gagal mengubah status pin")
    }
  }

  //sort helper : agar pin tetaplah diaatas
  // Helper: Fungsi untuk mengurutkan notes (Pin paling atas, lalu tanggal terbaru)
  const sortNotes = (dataNotes) => {
    return [...dataNotes].sort((a, b) => {
      // 1. Cek status Pin
      if (a.isPinned !== b.isPinned) {
        return a.isPinned ? -1 : 1; // Jika a dipin, dia naik ke atas (-1)
      }
      // 2. Jika status pin sama, urutkan berdasarkan waktu (terbaru di atas)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  // Filter notes berdasarkan pencarian
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* --- NAVBAR --- */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600">TaskFlow</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Halo, <b>{user?.username}</b></span>
            <button
              onClick={logout}
              className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        
        {/* --- FORM TAMBAH CATATAN --- */}
        <div className="mb-10 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">Buat Catatan Baru</h2>
          <form onSubmit={isEditing ? handleUpdateNote: handleCreateNote} className="space-y-4">
            <input
              type="text"
              placeholder="Judul Catatan..."
              className="w-full rounded border p-3 focus:border-blue-500 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Isi catatan Anda..."
              rows="3"
              className="w-full rounded border p-3 focus:border-blue-500 focus:outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            {/* --- COLOR PICKER --- */}
            <div className="flex gap-2 mb-4">
              {COLORS.map((option) => (
                <button
                  key={option.value}
                  type="button" // PENTING: Supaya gak nge-submit form
                  onClick={() => setSelectedColor(option.value)}
                  className={`w-8 h-8 rounded-full border-2 transition ${option.value} ${
                    selectedColor === option.value ? "border-blue-600 scale-110 shadow-md" : "border-gray-300"
                  }`}
                  title={option.name}
                />
              ))}
            </div>
            <button
              type="submit"
              className="rounded bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700"
            >{isEditing ? "Update Catatan" : "Tambah Catatan"}
            </button>
            {isEditing && (
              <button 
                type="button" 
                onClick={() => {
                  setIsEditing(false)
                  setCurrentNoteId(null)
                  setTitle("");
                  setContent("")
                  setSelectedColor("bg-white")
                }}
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Batal
              </button>
            )}
          </form>
        </div>
        {/* --- SEARCH BAR --- */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Cari catatan..."
            className="w-full rounded-full border px-4 py-2 focus:border-blue-500 focus:outline-none shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* --- DAFTAR CATATAN (GRID) --- */}
        {notes.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">Belum ada catatan.</p>
            <p className="text-sm">Yuk buat catatan pertamamu di atas!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* GANTI notes.map MENJADI filteredNotes.map */}
            {filteredNotes.map((note) => (
              <div 
                key={note._id} 
                className={`p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between relative ${note.color || "bg-white"} ${
                  note.isPinned ? "border-2 border-blue-400" : ""
                }`}
              >
                {/* Tombol PIN di pojok kanan atas */}
                <button 
                    onClick={() => handleTogglePin(note)}
                    className="absolute top-2 right-2 text-xl hover:scale-110 transition"
                    title={note.isPinned ? "Lepas Pin" : "Sematkan"}
                >
                    {note.isPinned ? "📌" : "📍"}
                </button>

                <div>
                  <h3 className="font-bold text-lg mb-1 pr-8">{/* pr-8 biar gak nabrak icon pin */}
                    {note.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">
                    {formatDate(note.createdAt)}
                  </p>
                  <p className="text-gray-600 mb-4 whitespace-pre-wrap">{note.content}</p>
                </div>
                
                <div className="flex justify-end gap-3 border-t pt-3 mt-auto">
                  <button 
                    onClick={() => handleDeleteNote(note._id)} 
                    className="text-red-500 text-sm hover:text-red-700 font-medium"
                  >
                    Hapus
                  </button>
                  
                  <button 
                    onClick={() => handleEditClick(note)} 
                    className="text-blue-500 text-sm hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}