# 🚀 Job Verse – Job Portal Application

A full-stack MERN Job Portal designed to connect **job seekers** with **employers**.
Users can register, apply for jobs, manage their profile, and administrators can manage jobs, users, and applications — all from a modern, responsive interface.

This project includes:
✔ Frontend (React + Vite) 
✔ Backend API (Node.js + Express + MongoDB) 
✔ Cloudinary for file uploads 
✔ Admin Dashboard 
✔ Fully responsive UI 

---

# 🌐 Live Demo (if you deploy later)

*Add link here*

---

# 🔑 Admin Login (for testing)

```
Email: admin@example.com  
Password: Admin@789
```

---

# 📌 Features

## 👤 User Authentication

* Register with name, email, password, profile picture, and resume
* Login / Logout
* Change password
* Delete account

## 🧑‍💼 User Profile

* View profile
* Edit profile (avatar, resume, skills)
* Update email and other details

## 💼 Job Management

* View all jobs
* View detailed job info
* Apply for jobs
* Save/un-save jobs

## 📄 Application Management

* View all applied jobs
* Check application details
* Application status updates

## 🛠 Admin Features

* Admin dashboard with stats
* Manage users (update or delete)
* Manage jobs (create, update, delete)
* Manage applications (view, update status, delete)

## 🎨 Additional Features

* Fully responsive
* Loading states
* Notifications
* Smooth animations (Framer Motion)

---

# 🛠 Tech Stack

### **Frontend**

* React.js
* Vite
* Redux Toolkit
* Tailwind CSS
* React Router
* Axios
* Framer Motion
* React Icons

### **Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* Cloudinary
* JWT Authentication
* Multer

---

# 📁 Folder Structure

```
Job-Verse-Application/
│
├── frontend/      → React + Vite application
└── backend/       → Node.js + Express API server
```

---

# ⚙️ Frontend Setup

```bash
git clone https://github.com/adityasupag1/Job-Verse-Application.git
cd frontend
npm install
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

# ⚙️ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_uri
PORT=your_port_number
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Run the server:

```bash
npm start
```

Backend runs on:

```
http://localhost:PORT
```

---

# 📡 API Endpoints Overview

## User Routes

```
POST   /api/v1/register
POST   /api/v1/login
GET    /api/v1/isLogin
GET    /api/v1/me
PUT    /api/v1/changePassword
PUT    /api/v1/updateProfile
PUT    /api/v1/deleteAccount
```

## Job Routes

```
POST   /api/v1/create/job
GET    /api/v1/jobs
GET    /api/v1/job/:id
GET    /api/v1/saveJob/:id
GET    /api/v1/getSavedJobs
```

## Application Routes

```
POST   /api/v1/createApplication/:id
GET    /api/v1/singleApplication/:id
GET    /api/v1/getAllApplication
DELETE /api/v1/deleteApplication/:id
```

## Admin Routes

```
GET    /api/v1/admin/allJobs
GET    /api/v1/admin/allUsers
GET    /api/v1/admin/allApp
GET    /api/v1/admin/getApplication/:id
PUT    /api/v1/admin/updateApplication/:id
DELETE /api/v1/admin/deleteApplication/:id
GET    /api/v1/admin/getUser/:id
PUT    /api/v1/admin/updateUser/:id
DELETE /api/v1/admin/deleteUser/:id
GET    /api/v1/admin/getJob/:id
PUT    /api/v1/admin/updateJob/:id
DELETE /api/v1/admin/deleteJob/:id
```

---

# 🧪 Postman Collection

Test all APIs:
👉 [https://documenter.getpostman.com/view/39260343/2sB34hHLcz](https://documenter.getpostman.com/view/39260343/2sB34hHLcz)

---

# 🎯 Future Improvements

* Resume parser
* Employer dashboards
* AI job recommendations
* Payment gateway for premium features

---

# ⭐ Author

**Aditya Raj**
Full-Stack Developer | MERN | AI | Web Apps

GitHub: [https://github.com/adityasupag1](https://github.com/adityasupag1)
LinkedIn: [Aditya Raj](https://www.linkedin.com/in/aditya-raj-44b375259/)

