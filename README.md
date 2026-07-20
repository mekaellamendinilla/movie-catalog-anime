# 🎬 RLZone - Movie Catalog System

A full-stack Movie Catalog System developed using React.js, Node.js, Express.js, and MySQL. The system provides separate interfaces for users and administrators, allowing users to browse movies while administrators manage the entire catalog through a dashboard.

---

# Project Overview

RLZone is a movie catalog web application designed to provide an organized and user-friendly platform for exploring movies.

The system consists of two main modules:

- User Module
- Admin Module

Users can register, log in, browse movies, search by title, filter by category, save favorites, and manage their watchlist.

Administrators can manage movies, categories, users, roles, and monitor overall system statistics through an administrative dashboard.

---

# Features

## User Features

- User Registration
- User Login & Logout
- JWT Authentication
- User Profile
- Edit Profile
- Upload Profile Picture
- Browse Movies
- Search Movies
- Filter by Category
- Pagination
- Movie Details
- Favorites
- Watchlist
- Responsive User Interface

---

## Admin Features

- Admin Login
- Dashboard Statistics
- Movie Management
  - Add Movie
  - Update Movie
  - Delete Movie
- Category Management
  - Add Category
  - Update Category
  - Delete Category
- User Management
  - Update Users
  - Delete Users
- Role Management
- Search Users
- Protected Admin Routes

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcryptjs
- Multer
- CORS
- dotenv

---

## Database

- MySQL

---

## Development Tools

- Visual Studio Code
- Postman
- Git
- GitHub
- Railway
- Vercel
- XAMPP (Local Development)
- TablePlus

---

# Project Structure

## Frontend

```
movie-catalog-frontend/
│
├── dist/
├── node_modules/
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── movies/
│   │   └── Toast.jsx
│   │
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │
│   ├── data/
│   │   ├── movie.js
│   │
│   ├── pages/
│   │   ├── admin-pages/
│   │   ├── public-pages/
│   │   └── user-pages/
│   │
│   ├── services/
│   │   ├── adminCategoryService.js
│   │   ├── adminMovieService.js
│   │   ├── adminService.js
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── categoryService.js
│   │   ├── favoriteService.js
│   │   ├── movieService.js
│   │   ├── userService.js
│   │   └── watchlistService.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## Backend

```
movie-catalog-backend/
│
├── node_modules/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── dashboardController.js
│   │   ├── favoriteController.js
│   │   ├── movieController.js
│   │   ├── userController.js
│   │   └── watchlistController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── profileUpload.js
│   │   └── upload.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── favoriteRoutes.js
│   │   ├── movieRoutes.js
│   │   ├── userRoutes.js
│   │   └── watchlistRoutes.js
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── movieService.js
│   │
│   ├── uploads/
│   │   ├── posters/
│   │   └── profiles/
│   │
│   └── server.js
│
├── .env
├── API.DOCUMENTATION.md
├── package.json
├── package-lock.json
└── README.md
```

---

# Database Tables

The application uses the following database tables:

- users
- roles
- movies
- categories
- favorites
- watchlists

---

# Authentication

The application uses JSON Web Token (JWT) authentication.

Authentication process:

1. User logs in.
2. Server validates credentials.
3. JWT Token is generated.
4. Token is stored on the client.
5. Protected routes require Authorization Bearer Token.

---

# User Module

Users can:

- Create an account
- Login securely
- Browse movies
- Search movies
- Filter by category
- View movie details
- Add to Favorites
- Add to Watchlist
- Update profile
- Upload profile picture
- Logout

---

# Admin Module

Administrators can:

- View Dashboard Statistics
- Manage Movies
- Manage Categories
- Manage Users
- Manage User Roles
- Delete Users
- Update User Information

---

# Dashboard Statistics

The admin dashboard displays:

- Total Movies
- Total Users
- Total Categories
- Total Favorites
- Total Watchlists

---

# REST API Endpoints

## Authentication

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
PUT    /api/auth/profile
POST   /api/auth/upload-profile
```

---

## Movies

```
GET     /api/movies
GET     /api/movies/:id
GET     /api/movies/search
GET     /api/movies/category/:id
GET     /api/movies/page
POST    /api/movies
PUT     /api/movies/:id
DELETE  /api/movies/:id
```

---

## Categories

```
GET
POST
PUT
DELETE
```

---

## Favorites

```
GET
POST
DELETE
```

---

## Watchlist

```
GET
POST
DELETE
```

---

## Users

```
GET
GET /:id
PUT
PUT /:id/role
DELETE
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/mendinillamekaella/movie-catalog-anime.git
```

---

## Install Frontend

```bash
cd frontend
npm install
```

---

## Install Backend

```bash
cd backend
npm install
```

---

## Configure Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=movie_catalog

JWT_SECRET=your_secret_key
```

---

## Start Backend

```bash
npm run dev
```

---

## Start Frontend

```bash
npm run dev
```

---

# File Upload

Movie posters and profile pictures are uploaded using Multer.

Uploaded files are stored inside the uploads directory and served as static assets.

---

# Security

- Password Hashing using bcrypt
- JWT Authentication
- Role-Based Authorization
- Protected Routes
- Server-side Validation

---

# Deployment

Frontend:

- Vercel

Backend:

- Railway

Database:

- Railway MySQL

---

# Testing

The application was tested using:

- Postman
- Browser Testing
- CRUD Testing
- Authentication Testing
- API Endpoint Testing
- TablePlus

---

# Future Improvements

- Movie Ratings
- Movie Trailer
- Comments and Reviews
- Dark/Light Theme
- Email Verification
- Forgot Password
- Admin Analytics Charts
- Activity Logs
- Movie Recommendations
- Recently Viewed Movies
- Notifications

---

# Intern Developer

Mekaella Mendinilla

Bachelor of Science in Computer Science

Colegio de San Gabriel Arcangel, Inc.

---

# License

This project is developed for educational purposes as part of the Bachelor of Science in Computer Science internship (OJT) requirements.
