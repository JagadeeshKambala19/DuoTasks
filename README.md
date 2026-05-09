# Cloud-Native Task Management Platform

## Overview

Cloud-Native Task Management Platform is a full-stack task management application designed using modern software engineering and cloud-native development practices. The platform enables users to create, manage, update, and track tasks through a responsive frontend interface and scalable backend architecture.

The project demonstrates:

* Full-stack application development
* RESTful API architecture
* Docker containerization
* MySQL database integration
* Backend service orchestration
* Environment-based configuration management
* Scalable application structure


---

# Features

## Task Management

* Create tasks
* Update task status
* Edit task details
* Delete tasks
* View all tasks

---

## Frontend Features

* Responsive user interface
* Dynamic task rendering
* API-driven data handling
* Reusable component structure

---

## Backend Features

* RESTful API architecture
* CRUD operations
* MySQL database integration
* Express.js routing
* Environment variable configuration

---

# Tech Stack

## Frontend

* React.js
* Tailwind CSS
* JavaScript

---

## Backend

* Node.js
* Express.js

---

## Database

* MySQL

---

## Containerization

* Docker
* Docker Compose

---

# Project Architecture

## Application Flow

Client
↓
React Frontend
↓
Express.js Backend API
↓
MySQL Database

---

# Repository Structure

```bash
project-root/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── config/
│   └── package.json
│
├── database/
│
├── docker-compose.yml
├── Dockerfile
├── .env
└── README.md
```

---

# Local Development Setup

## Prerequisites

Install the following tools before running the project:

* Node.js
* Docker
* Docker Compose
* MySQL
* Git

---

# Installation

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd project-name
```

---

## Step 2: Configure Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=taskmanager
```

---

## Step 3: Install Dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

---

# Running the Application

## Start Backend

```bash
cd backend
npm start
```

---

## Start Frontend

```bash
cd frontend
npm run dev
```

---

# Access Application

Frontend:

```bash
http://localhost:5173
```

Backend API:

```bash
http://localhost:5000
```

---

# Docker Setup

The platform supports containerized deployment using Docker.

---

# Build Docker Containers

```bash
docker compose build
```

---

# Start Containers

```bash
docker compose up -d
```

---

# Stop Containers

```bash
docker compose down
```

---

# Docker Services

The Docker environment includes:

* Frontend container
* Backend container
* MySQL database container

---

# API Endpoints

## Tasks

### Get All Tasks

```http
GET /tasks
```

---

### Create Task

```http
POST /tasks
```

---

### Update Task

```http
PUT /tasks/:id
```

---

### Delete Task

```http
DELETE /tasks/:id
```

---

# Database Integration

The platform uses MySQL for persistent task storage.

## Database Responsibilities

* Store task records
* Handle task status updates
* Persist application data

---

# Common Debugging Commands

## View Running Containers

```bash
docker ps
```

---

## View Container Logs

```bash
docker logs <container-name>
```

---

## Stop All Containers

```bash
docker compose down
```

---

## Restart Containers

```bash
docker compose up --build
```

# Future Enhancements

Potential future improvements:

* User authentication and authorization
* JWT-based security
* Role-based access control
* Cloud deployment on AWS
* CI/CD automation
* Kubernetes orchestration
* Redis caching
* Real-time notifications
* Task analytics dashboard

