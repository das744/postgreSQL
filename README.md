
# frontend
Frontend (React) → sends form data to backend.
# backend
Backend (Express) → saves data into PostgreSQL.
# PostgreSQL
PostgreSQL (local) → stores submissions.
# DBeaver
DBeaver → visually inspect and query submissions without needing psql


# for backend
Backend runs on http://localhost:5000 → handles API + PostgreSQL.

# for frontend
Frontend runs on http://localhost:3000 → React form + submissions list.

## Backend start
```bash
cd backend
node index.js

## Frontend start
cd frontend
npm start