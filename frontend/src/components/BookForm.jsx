import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BookForm = () => {
  const [book, setBook] = useState({ bookId: '', title: '', author: '', category: '', publisher: '', publishYear: '', isbn: '', quantity: '', description: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (id) {
      axios.get(`${apiUrl}/${id}`).then(res => setBook(res.data)).catch(err => console.error(err));
    }
  }, [id, apiUrl]);

  const handleChange = (e) => setBook({ ...book, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ép kiểu 2 trường này về dạng Số (Number) trước khi gửi
    const dataToSend = {
      ...book,
      publishYear: Number(book.publishYear),
      quantity: Number(book.quantity)
    };

    try {
      if (id) {
        await axios.put(`${apiUrl}/${id}`, dataToSend);
        alert('Cập nhật thành công!');
      } else {
        await axios.post(apiUrl, dataToSend);
        alert('Thêm sách thành công!');
      }
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.error || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="card p-4">
      <h2 className="mb-4">{id ? 'Cập nhật sách' : 'Thêm sách mới'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input className="form-control" name="bookId" placeholder="Mã sách (VD: B001)" value={book.bookId} onChange={handleChange} required disabled={!!id} />
          </div>
          <div className="col-md-6 mb-3">
            <input className="form-control" name="title" placeholder="Tên sách" value={book.title} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <input className="form-control" name="author" placeholder="Tác giả" value={book.author} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <input className="form-control" name="category" placeholder="Thể loại" value={book.category} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <input className="form-control" name="publisher" placeholder="Nhà xuất bản" value={book.publisher} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <input type="number" className="form-control" name="publishYear" placeholder="Năm xuất bản" value={book.publishYear} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <input className="form-control" name="isbn" placeholder="Mã ISBN" value={book.isbn} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <input type="number" className="form-control" name="quantity" placeholder="Số lượng" value={book.quantity} onChange={handleChange} required />
          </div>
        </div>
        <textarea className="form-control mb-3" name="description" placeholder="Mô tả ngắn" value={book.description} onChange={handleChange}></textarea>
        <button type="submit" className="btn btn-success px-4">{id ? 'Lưu cập nhật' : 'Thêm mới'}</button>
      </form>
    </div>
  );
};

export default BookForm;