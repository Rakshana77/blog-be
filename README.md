# Rakshana Blog API – Backend (Express + MongoDB)

A secure, multi‑user blogging API built with **Node.js, Express, MongoDB Atlas, JWT, and bcryptjs**.  
It powers the Arnifi Blog frontend, providing endpoints for authentication and full CRUD on blog posts.

---

## 1. Stack

| Layer        | Tech                                    |
|--------------|-----------------------------------------|
| Runtime      | Node ≥ 18                               |
| HTTP server  | Express 5                               |
| Database     | MongoDB Atlas (Mongoose ≥ 8)            |
| Auth         | JSON Web Token (`jsonwebtoken`)         |
| Passwords    | `bcryptjs` (hashed with 10 salt rounds) |

---

## 2. Getting Started Locally

```bash
git clone https://github.com/<you>/arnifi-blog.git
cd arnifi-blog/backend
cp .env.example .env            # fill in the values below
npm install
npm run dev                      # nodemon
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pwd>@cluster.mongodb.net/blogdb
JWT_SECRET=super‑secret‑string
3. Scripts
Command	Purpose
npm run dev	Start API with nodemon + env vars
npm start	Start API with node (prod)
npm test	Placeholder for future tests
npm run lint	ESLint code check

4. Folder Structure
csharp
Copy
Edit
backend
 ├─ models/            # Mongoose schemas (User, Blog)
 ├─ routes/            # Express routers (authRoutes, blogRoutes)
 ├─ middleware/        # JWT auth, error handler
 ├─ controllers/       # (optional) business logic
 ├─ index.js           # entry point
 └─ README.md
5. API Reference
Auth
Method	Endpoint	Body / Query	Access
POST	/api/auth/signup	{ name, email, password }	public
POST	/api/auth/login	{ email, password } → { token }	public

Blogs
All Blog routes require the Authorization: Bearer <token> header.

Method	Endpoint	Purpose / Notes
GET	/api/blogs	List all blogs (supports filters)
GET	/api/blogs?category=CSS&author=Jane	Filter by category, author, or both
GET	/api/blogs/myblogs/user	List blogs authored by current user
POST	/api/blogs	Create blog (title, category, content…)
PUT	/api/blogs/:id	Update own blog
DELETE	/api/blogs/:id	Delete own blog

6. Contributing
Fork and clone repository

Create a branch: git checkout -b feat/<feature>

Commit with conventional commits (feat: add x, fix: bug y)

Push and open a PR

7. Deployment Guide (Render)
Create a new Web Service ➜ Environment Node

Set Root Directory to backend

Add env vars (PORT, MONGODB_URI, JWT_SECRET)

Build Command: npm install

Start Command: npm start

Enable Auto‑Deploy on push to main
