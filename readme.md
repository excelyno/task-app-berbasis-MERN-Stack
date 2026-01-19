# 📝 TaskFlow - MERN Stack Notes App

A full-stack note-taking application built with the **MERN Stack** (MongoDB, Express, React, Node.js). This application allows users to manage their daily tasks and ideas with features like pinning important notes, color-coding, and real-time search.

## 🚀 Features

* **🔐 Secure Authentication:** User registration and login using JWT (JSON Web Tokens).
* **✏️ Full CRUD:** Create, Read, Update, and Delete notes.
* **📌 Pinned Notes:** Pin important notes to keep them at the top of the list.
* **🎨 Color Coding:** Organize notes by assigning different background colors.
* **🔍 Real-time Search:** Filter notes instantly by title or content.
* **📱 Responsive Design:** Built with Tailwind CSS for a modern, mobile-friendly UI.
* **🕒 Timestamp:** Auto-generated creation dates for every note.

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS
* Axios (API Integration)
* React Router DOM
* React Toastify (Notifications)


**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (Database)
* BCryptJS (Password Hashing)
* JSON Web Token (Authentication)
* Cors

## 📂 Project Structure

```bash
mern-notes-app/
├── backend/        # Server-side code (Node/Express)
│   ├── config/     # DB Connection
│   ├── controllers/# Logic for notes & auth
│   ├── models/     # Mongoose Schemas
│   ├── routes/     # API Routes
│   └── server.js   # Entry point
└── frontend/       # Client-side code (React)
    ├── src/
    │   ├── api/    # Axios setup
    │   ├── context/# Auth Context
    │   ├── pages/  # Dashboard, Login, Register
    │   └── ...