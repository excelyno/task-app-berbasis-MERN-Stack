import React from 'react';

// Komponen ini menerima data catatan & fungsi delete
export default function NoteCard({ note, onDelete }) {
  // Format tanggal agar mudah dibaca
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="flex flex-col justify-between rounded-xl bg-white p-6 shadow-md transition hover:shadow-xl">
      <div>
        <h3 className="mb-2 text-xl font-bold text-gray-800">{note.title}</h3>
        <p className="whitespace-pre-wrap text-gray-600">{note.content}</p>
      </div>
      
      <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm text-gray-500">
        <span>{formatDate(note.createdAt)}</span>
        
        <button
          onClick={() => onDelete(note._id)}
          className="rounded-md bg-red-100 px-3 py-1 text-red-600 transition hover:bg-red-200"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}