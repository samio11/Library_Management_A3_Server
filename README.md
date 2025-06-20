# 📚 Library Management API

The **Library Management API** is a RESTful backend system built with Node.js and Express.js, designed to simplify book inventory and borrowing operations. Ideal for small to medium-sized libraries or educational use cases, this API provides a robust solution for managing books, tracking availability, and handling borrow requests.

---

## 🛠 Technologies Used

- **Node.js** – Runtime environment for executing JavaScript on the server
- **Express.js** – Web application framework for Node.js
- **MongoDB** – NoSQL database for storing book and borrowing records
- **Mongoose** – Elegant MongoDB object modeling for Node.js
- **Postman** – API testing and documentation tool

---

## 🌐 Base URL
https://library-management-a3-server.vercel.app/
---

## 📦 API Endpoints

### 📘 Book Routes

#### ➕ Create a Book
**`POST /api/books`**

Add a new book to the system.

**Request Body:**
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}

```

####  Get Books
**`GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`**

GET  books with filter to the system.

**Request Body:**
```json
{
    "success": true,
    "message": "Books retrieved successfully",
    "data": [
        {
            "_id": "685535dda2ea480d40c455c1",
            "title": "The Silmarillion",
            "author": "J.R.R. Tolkien",
            "genre": "FANTASY",
            "isbn": "9780618391110",
            "description": "A collection of mythopoeic stories from the history of Middle-earth.",
            "copies": 12,
            "available": true,
            "createdAt": "2025-06-20T10:20:13.460Z",
            "updatedAt": "2025-06-20T10:20:13.460Z"
        },
        {
            "_id": "68553548a2ea480d40c455b1",
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "genre": "FANTASY",
            "isbn": "9780261102217",
            "description": "A fantasy adventure about a hobbit's journey to reclaim treasure.",
            "copies": 14,
            "available": true,
            "createdAt": "2025-06-20T10:17:44.827Z",
            "updatedAt": "2025-06-20T10:17:44.827Z"
        }
    ]
}
```

####  Get Borrowa
**`GET /api/borrow`**

GET  borrow  to the system.

**Request Body:**
```json
{
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
        {
            "totalQuantity": 11,
            "book": {
                "title": "The Art of War",
                "isbn": "9781599869773"
            }
        },
        {
            "totalQuantity": 4,
            "book": {
                "title": "To Kill a Mockingbird",
                "isbn": "9780061120084"
            }
        }
    ]
}
```

