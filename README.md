# Book Catalog API with Authentication

**Student Name:** Hariharan P

**Project Name:** Backend Module API

**GitHub Repository:** https://github.com/Hariharanpugazh/backend-module

**Backend Deployment:** https://backend-module-go8p.onrender.com

---

A RESTful API for managing a book catalog with JWT-based user authentication. Built with Node.js, Express, MongoDB, and Mongoose.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken) for auth
- bcrypt for password hashing
- dotenv for environment config

## Setup

```bash
npm install
```

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/book-catalog
JWT_SECRET=your_jwt_secret_key_here
```

Start the server:

```bash
npm run dev    # with nodemon (hot reload)
npm start      # production
```

## API Endpoints

### User Routes

| Method | Endpoint              | Auth | Description        |
|--------|-----------------------|------|--------------------|
| POST   | /api/users/register   | No   | Register a new user|
| POST   | /api/users/login      | No   | Login, get JWT     |

### Book Routes

| Method | Endpoint          | Auth | Description      |
|--------|-------------------|------|------------------|
| GET    | /api/books        | No   | Get all books    |
| GET    | /api/books/:id    | No   | Get book by ID   |
| POST   | /api/books        | Yes  | Create a book    |
| PUT    | /api/books/:id    | Yes  | Update a book    |
| DELETE | /api/books/:id    | Yes  | Delete a book    |

Protected routes require the header: `Authorization: Bearer <token>`

## Request Examples

### Register

```json
POST /api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```
Response: 201 Created with user details

### Login

```json
POST /api/users/login
{
  "email": "john@example.com",
  "password": "Password123"
}
```
Response: 200 OK with JWT token

### Create Book (requires token)

```json
POST /api/books
Authorization: Bearer <token>
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-Help",
  "price": 499,
  "inStock": true
}
```

## Folder Structure

```
backend-module/
  controllers/
    bookController.js
    userController.js
  models/
    Book.js
    User.js
  routes/
    bookRoutes.js
    userRoutes.js
  middleware/
    authMiddleware.js
  config/
    db.js
  .env
  server.js
  package.json
```

## Mongoose Models

**User** — name (String, required), email (String, required, unique), password (String, required, hashed)

**Book** — title (String, required), author (String, required), genre (String, required), price (Number, required), inStock (Boolean, default: true)
