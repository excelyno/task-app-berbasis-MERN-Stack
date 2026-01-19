import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Pastikan dia baca process.env.MONGO_URI, BUKAN string hardcoded!
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    // 👇 TAMBAHKAN BARIS INI UNTUK MELIHAT NAMA DATABASE 👇
    console.log(`📂 Nama Database Aktif: ${conn.connection.name}`); 
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;