import { Routes, Route, Link } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 p-2 rounded">
        <Link className="navbar-brand" to="/">Quản lý sách Đám mây</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Danh sách</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">Thêm sách mới</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/add" element={<BookForm />} />
        <Route path="/edit/:id" element={<BookForm />} />
      </Routes>
    </div>
  );
}

export default App;