**# CipherSQLStudio
🚀CipherSQLStudio, SQL Learning Platform<img width="1536" height="1024" alt="Dataflow-Diagram" src="https://github.com/user-attachments/assets/4d30c8e1-2a98-436d-87b8-71aa3d48d1e4" />


A Full-Stack SQL Practice & AI-Assisted Learning Platform built with React, Node.js, MongoDB, and OpenAI.

🌐 Live Overview

The SQL Learning Platform is an interactive web application that allows users to:

Write and execute SQL queries

Practice structured assignments

Receive AI-powered hints (without revealing full solutions)

View results in a structured format

Learn SQL in a real IDE-like environment

This project simulates a modern SQL learning tool similar to LeetCode / HackerRank.

🧩 Architecture Overview
User → React Frontend → Express Backend → MongoDB
                               ↓
                           OpenAI API

React handles UI and SQL editor

Express manages API routing and validation

MongoDB stores assignments and schema

OpenAI generates contextual SQL hints

🛠 Tech Stack
Frontend

React.js

Axios

Monaco Editor (VS Code-like SQL Editor)

CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

OpenAI API

📁 Folder Structure
CipherSchools/
│
├── backend/
│   ├── node_modules/
│   ├── src/
│   ├── .env.example
│   ├── .gitignore
│   ├── package-lock.json
│   └── package.json
│
├── config/
│   ├── dbMongo.js
│   ├── dbPostgres.js
│   └── envconfig.js
│
├── controllers/
│   ├── assignmentController.js
│   ├── authController.js
│   ├── hintController.js
│   └── queryController.js
│
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── querySanitizer.js
│
├── models/
│   ├── Assignment.js
│   ├── Attempt.js
│   └── User.js
│
├── routes/
│   ├── AssignmentRoutes.js
│   ├── authRoutes.js
│   ├── hintRoutes.js
│   └── queryRoutes.js
│
├── services/
│   ├── llmService.js
│   ├── logger.js
│   └── sqlExecutor.js
│
├── utils/
│   ├── formateResults.js
│   └── validateInput.js
│
├── app.js
├── seedAssignment.js
└── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   │
    │   ├── assets/
    │   │   └── react.svg
    │   │
    │   ├── components/
    │   │   ├── AssignmentCard.jsx
    │   │   ├── AssignmentsView.jsx
    │   │   ├── AttemptView.jsx
    │   │   ├── LoginSignup.jsx
    │   │   ├── ResultsTable.jsx
    │   │   ├── SQLEditor.jsx
    │   │   ├── SQLStudio.jsx
    │   │   └── SchemaViewer.jsx
    │   │
    │   ├── App.jsx
    │   ├── App.scss
    │   ├── index.css
    │   └── main.jsx
    │
    ├── .gitignore
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    └── vite.config.js

✨ Key Features
🧠 AI-Powered Hint System

Integrates OpenAI API

Provides contextual guidance

Avoids revealing full solutions

💻 Professional SQL Editor

Monaco Editor (VS Code engine)

Syntax highlighting

Auto-completion

Formatting support

Responsive design

🔄 Real-Time Query Execution

Structured API response

Proper HTTP status codes

Error handling middleware

🛡 Robust Error Handling

400 Validation errors

500 Internal server handling

Axios error management

Graceful UI feedback

🗃 Assignment-Based Practice

MongoDB-based schema storage

Seeded sample data

Dynamic assignment loading

⚙️ Installation Guide
1️⃣ Clone Repository
git clone https://github.com/riteshmaurya089/CipherSchools
cd sql-learning-platform
2️⃣ Backend Setup
cd backend
npm install

Create .env file:

# =========================
# SERVER CONFIG
# =========================
PORT=5000
NODE_ENV=development

# =========================
# POSTGRESQL CONFIG
# =========================
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=postgres
POSTGRES_URI=your_POSTGRES_URI

# =========================
# MONGODB CONFIG
# =========================
MONGO_URI=Your_db_string

# =========================
# AI CONFIG
# AI CONFIG
LLM_PROVIDER=huggingface
HF_API_KEY=Your_api_key

# SECURITY
# SECURITY / LIMITS
# =========================
MAX_QUERY_EXECUTION_TIME=10000   # in milliseconds
MAX_RESULT_ROWS=1000

Run server:

npm run dev

Server runs at:

http://localhost:5000
3️⃣ Frontend Setup
cd frontend
npm install
npm start

App runs at:5173

http://localhost:
📡 API Endpoints
🔹 Execute SQL Query
POST (http://localhost:5000/api/queries/execute)

Request Body:

{
  "assignmentId": "123",
  "query": "SELECT * FROM employees"
}
🔹 Generate AI Hint
POST /api/hint

📊 Data Flow Diagram

The system follows this data flow:

User writes SQL query

React sends API request

Express validates input

MongoDB provides schema/sample data

OpenAI generates hint (if requested)

Backend sends response to frontend

Results displayed in table format

(Hand-drawn DFD included in submission)

👨‍💻 Author

Rites Maurya

This project is built for educational purposes.
**
