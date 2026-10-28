import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${apiUrl}?search=${search}`);
      setBooks(res.data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sách này?')) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchBooks(); 
      } catch (error) {
        console.error("Lỗi xóa sách", error);
      }
    }
  };

  return (
    <div>
      <h2 className="mb-3">Danh sách Sách</h2>
      <div className="d-flex mb-3">
        <input type="text" className="form-control me-2" placeholder="Tìm kiếm sách theo tên, tác giả..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="btn btn-primary" onClick={fetchBooks}>Tìm</button>
      </div>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Mã sách</th>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Thể loại</th>
            <th>Số lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.bookId}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.quantity}</td>
              <td>
                <Link to={`/edit/${book._id}`} className="btn btn-sm btn-warning me-2">Sửa</Link>
                <button onClick={() => handleDelete(book._id)} className="btn btn-sm btn-danger">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;