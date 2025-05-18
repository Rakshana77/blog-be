# Arnifi Blog API – Backend (Express + MongoDB)

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
