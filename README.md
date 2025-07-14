# 📋 Task Tracker with Priority – A Full-Stack Application Demonstrating Data Structures

## 🚀 Project Overview

**Task Tracker with Priority** is a simple yet effective full-stack task management application designed to showcase the practical use of fundamental data structures like **Queues** and **Stacks** in a real-world scenario.

This application allows users to add tasks with different priorities, view pending and completed tasks, and manage them efficiently while conceptually leveraging data structures:
- **Queue** for managing **pending tasks** (FIFO)
- **Stack** for managing **completed tasks** (LIFO)

> 🎯 This project highlights full-stack development skills, RESTful API design, database integration, and the application of core computer science concepts.

---

## ✨ Features

- ✅ **Add Tasks** with title, description (optional), and priority (High, Medium, Low)
- ⏳ **Pending Tasks** displayed in FIFO order (Queue)
- ✔️ **Mark Tasks as Completed**, simulating push into Stack
- 📋 **Completed Tasks** displayed in LIFO order (Stack)
- 🗑️ **Delete Tasks** from system
- 📱 **Responsive UI** with Tailwind CSS

---

## 🛠️ Technologies Used

### 🖥️ Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### 🌐 Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)

### 🗄️ Database
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📚 Data Structures in Action

### 📥 Pending Tasks (Queue)
- Tasks are conceptually **enqueued** when added.
- `GET /api/tasks/pending`: Fetches tasks sorted by creation date (`createdAt: 1`) → **FIFO** behavior.

### 📤 Completed Tasks (Stack)
- Tasks are conceptually **pushed** onto a stack when completed.
- `GET /api/tasks/completed`: Fetches tasks sorted by completion date (`completedAt: -1`) → **LIFO** behavior.

Although MongoDB handles data persistence, **controller logic** reflects the conceptual use of Queues and Stacks.

---

## ⚙️ Installation and Setup

### ✅ Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/)
- MongoDB Atlas Account

### 📦 Clone the Repository

# Fork it
git checkout -b feature/my-feature
git commit -m "Add awesome feature"
git push origin feature/my-feature



---

# Node
node_modules/
.env
.DS_Store

# Build files
dist/
build/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*


### 🧾 Additional Files You Should Add

#### ✅ `.env.example`




```env
# MongoDB connection string
MONGO_URI=

# Server port
PORT=5000



```bash
git clone https://github.com/[YOUR_GITHUB_USERNAME]/task-tracker-ds.git
cd task-tracker-ds

cd backend
npm install

MONGO_URI=mongodb+srv://taskuser:YOUR_ACTUAL_MONGO_DB_PASSWORD@task-tracker-cluster.6gheaqb.mongodb.net/?retryWrites=true&w=majority&appName=task-tracker-cluster
PORT=5000

cd ../frontend
npm install
npm run dev




