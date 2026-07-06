# Movie Catalog REST API Documentation

## Overview

The Movie Catalog REST API is a backend service built with **Node.js**, **Express.js**, and **MySQL**. It provides CRUD (Create, Read, Update, Delete) operations for managing studio ghibli movies.

---

# Base URL

```
http://localhost:5000/api/movies
```

---

# Technology Stack

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- Postman (API Testing)

---

# API Endpoints

## 1. Get All Movies

Returns a list of all movies.

### Request

```
GET /api/movies
```

### Response

**Status:** `200 OK`

```json
[
  {
    "id": 1,
    "title": "Spirited Away",
    "category": "Fantasy",
    "year": 2001,
    "duration": "125m",
    "image": "/images/movies/spirited-away.jpg",
    "description": "While moving to a new neighborhood, 10-year-old Chihiro wanders into a mysterious, abandoned amusement park that turns out to be a realm of spirits and gods. After her parents are transformed into pigs, she must work in a magical bathhouse ruled by an eccentric witch to find a way to break the curse and return to the human world."
  }
]
```

---

## 2. Get Movie by ID

Returns a single movie using its ID.

### Request

```
GET /api/movies/:id
```

### Example

```
GET /api/movies/1
```

### Response

**Status:** `200 OK`

```json
{
  "id": 1,
  "title": "Spirited Away",
  "category": "Fantasy",
  "duration": "125m",
  "year": 2001,
  "image": "/images/movies/spirited-away.jpg",
  "description": "While moving to a new neighborhood, 10-year-old Chihiro wanders into a mysterious, abandoned amusement park that turns out to be a realm of spirits and gods. After her parents are transformed into pigs, she must work in a magical bathhouse ruled by an eccentric witch to find a way to break the curse and return to the human world."
}
```

### Error Response

**Status:** `404 Not Found`

```json
{
  "message": "Movie not found"
}
```

---

## 3. Create Movie

Creates a new movie.

### Request

```
POST /api/movies
```

### Request Body

```json
{
  "title": "Ponyo",
  "category": "Fantasy",
  "duration": "1h 41m",
  "year": 2008,
  "image": "/images/movies/ponyo.jpg",
  "description": "A heartwarming tale about a five-year-old boy named Sosuke who rescues a magical goldfish trapped in a glass jar by the shore. He names her Ponyo, but she is actually the daughter of a powerful sea wizard. As their bond grows, Ponyo uses her magic to transform into a human girl, accidentally triggering a dangerous mystical imbalance in the oceans."
}
```

### Response

**Status:** `201 Created`

```json
{
  "message": "Movie added successfully"
}
```

---

## 4. Update Movie

Updates an existing movie.

### Request

```
PUT /api/movies/:id
```

### Example

```
PUT /api/movies/1
```

### Request Body

```json
{
  "title": "Spirited Away Updated",
  "category": "Fantasy",
  "duration": "2h 5m",
  "year": 2001,
  "image": "spirited-away.jpg",
  "description": "Updated movie description."
}
```

### Response

**Status:** `200 OK`

```json
{
  "message": "Movie updated successfully"
}
```

---

## 5. Delete Movie

Deletes a movie by ID.

### Request

```
DELETE /api/movies/:id
```

### Example

```
DELETE /api/movies/1
```

### Response

**Status:** `200 OK`

```json
{
  "message": "Movie deleted successfully"
}
```

---

# HTTP Status Codes

| Status Code | Description                   |
| ----------- | ----------------------------- |
| 200         | Request successful            |
| 201         | Resource created successfully |
| 404         | Resource not found            |
| 500         | Internal server error         |

---

# Database Schema

Table Name: **movies**

| Column      | Type                              |
| ----------- | --------------------------------- |
| id          | INT (Primary Key, Auto Increment) |
| title       | VARCHAR(255)                      |
| category    | VARCHAR(100)                      |
| duration    | VARCHAR(50)                       |
| year        | INT                               |
| image       | VARCHAR(255)                      |
| description | TEXT                              |
| created_at  | TIMESTAMP                         |

---

# Project Structure

```
movie-catalog-backend
│
├── src
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   └── movieController.js
│   │
│   ├── routes
│   │   └── movieRoutes.js
│   │
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

# API Testing

All endpoints were tested using **Postman**.

The following operations were successfully tested:

- Get all movies
- Get movie by ID
- Create movie
- Update movie
- Delete movie

---

# Author - Mekaella Mendinilla

Movie Catalog REST API

Developed as part of an internship backend development task using Node.js, Express.js, and MySQL.
