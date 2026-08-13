# Perfume Project

## Project Overview
Full-stack web application with separate React frontend and Node.js backend.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 8 |
| Backend | Express.js 5 |
| Database | MongoDB (via Mongoose 9) |
| Dev Tools | Nodemon, Vite HMR |

## Directory Structure
```
perfume/
├── frontend/          # React + Vite app
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/           # Express.js API server
│   ├── routes/
│   │   └── api.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── knowledge-base/
    ├── README.md
    └── changelog.md
```

## Reading Order
| File | Description |
|------|-------------|
| README.md | Project overview (this file) |
| changelog.md | Chronological change history |

## Running the App

### Frontend (React)
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173 (or next available port)
```

### Backend (Node.js)
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

## API Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Server status |
| GET | `/api` | API info |
| GET | `/api/health` | Health check |

## Quick Facts
| Item | Value |
|------|-------|
| Frontend Port | 5173 |
| Backend Port | 5000 |
| Database | MongoDB (localhost:27017/perfume-app) |
| Frontend Framework | React 19 |
| Backend Framework | Express 5 |
