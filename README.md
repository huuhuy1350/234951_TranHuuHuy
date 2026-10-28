# 📚 Hệ thống Quản lý Sách trên Nền tảng Điện toán Đám mây

- **Họ và tên:** Trần Hữu Huy
- **Mã số sinh viên (MSSV):** 234951
- **Lớp học phần:** DH23TIN05
- **Trường:** Đại học Nam Cần Thơ

---

## 🚀 Giới thiệu đề tài
Ứng dụng Full-stack Web Quản lý Sách được xây dựng nhằm thực hiện bài tập lớn học phần **Điện toán Đám mây**. Hệ thống cho phép thực hiện các thao tác quản lý dữ liệu sách (Thêm, Xem, Cập nhật, Xóa) và tìm kiếm linh hoạt theo từ khóa, được triển khai hoàn toàn trên các dịch vụ điện toán đám mây.

## 🛠️ Công nghệ sử dụng
- **Frontend:** React (Vite), HTML5, CSS3, JavaScript, Axios
- **Backend:** Node.js, Express.js, CORS, Mongoose
- **Database:** MongoDB Atlas (NoSQL Cloud Database)
- **Containerization & Registry:** Docker, Docker Hub
- **Cloud Deployment:** Render (Web Service cho Backend, Static Site cho Frontend)
- **Version Control:** Git & GitHub

---

## 📂 Cấu trúc Thư mục Dự án
```text
234951_TranHuuHuy/
│
├── backend/                  # Mã nguồn phía Server (Node.js & Express)
│   ├── models/               # Định nghĩa Schema MongoDB (Book.js)
│   ├── .env                  # Cấu hình biến môi trường cục bộ
│   ├── Dockerfile            # Tệp cấu hình đóng gói Docker cho Backend
│   ├── package.json          # Thư viện phụ thuộc Backend
│   └── server.js             # Điểm khởi chạy API và kết nối Database
│
├── frontend/                 # Mã nguồn phía Client (React Vite)
│   ├── src/                  # Thành phần giao diện (components, App.jsx,...)
│   ├── .env.production       # Biến môi trường build frontend
│   ├── Dockerfile            # Tệp cấu hình đóng gói Docker cho Frontend
│   └── package.json          # Thư viện phụ thuộc Frontend
│
├── .gitignore                # Các tệp tin/thư mục bị bỏ qua bởi Git
└── README.md                 # Tài liệu mô tả và hướng dẫn dự án