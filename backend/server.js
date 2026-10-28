const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Book = require('./models/Book');

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Ket noi MongoDB Atlas thanh cong!'))
  .catch(err => console.error('❌ Loi ket noi MongoDB:', err));

// Endpoint kiểm tra trạng thái
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Lấy danh sách & Tìm kiếm sách
app.get('/api/books', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ]
      };
    }
    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Loi he thong' });
  }
});

// Thêm sách mới
app.post('/api/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ error: 'Ma sach da ton tai' });
    res.status(400).json({ error: 'Du lieu khong hop le' });
  }
});

// Xem, Cập nhật, Xóa (Các tính năng khác)
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Khong tim thay' });
    res.json(book);
  } catch (error) { res.status(500).json({ error: 'Loi server' }); }
});

app.put('/api/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (error) { res.status(400).json({ error: 'Loi cap nhat' }); }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xoa thanh cong' });
  } catch (error) { res.status(500).json({ error: 'Loi xoa' }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server Backend chay tren cong ${PORT}`));