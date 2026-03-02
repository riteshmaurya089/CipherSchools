🚀CipherSQLStudio, SQL Learning Platform


<img width="1920" height="851" alt="cipher1" src="https://github.com/user-attachments/assets/b8ae9a2a-b983-4c2e-a1a1-3ce4d3382ba1" />
<img width="1920" height="883" alt="cipher2" src="https://github.com/user-attachments/assets/5b4c3bd1-837e-430b-8c98-ab2ad57c549b" />
<img width="1920" height="887" alt="cipher3" src="https://github.com/user-attachments/assets/bfd2add8-2b08-4af5-a4c5-1cd0f34b5720" />




![dataflow](https://github.com/user-attachments/assets/333f54c1-e5e5-4d9e-ac8f-b3c88f03babd)

A Full-Stack SQL Practice & AI-Assisted Learning Platform built with React, Node.js, MongoDB, and OpenAI/HuggingFace.

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
                           OpenAI/huggingface API

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

OpenAI/huggingface API

📁 Folder Structure
CipherSchools/
│
├── backend/                               
│   ├── node_modules/                                                                                                                                                                                    
│   ├── src/
│   │   ├── config/
│   │   │   ├── dbMongo.js
│   │   │   ├── dbPostgres.js
│   │   │   └── envconfig.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── assignmentController.js
│   │   │   ├── authController.js
│   │   │   ├── hintController.js
│   │   │   └── queryController.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── querySanitizer.js
│   │   │
│   │   ├── models/
│   │   │   ├── Assignment.js
│   │   │   ├── Attempt.js
│   │   │   └── User.js
│   │   │
│   │   ├── routes/
│   │   │   ├── AssignmentRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── hintRoutes.js
│   │   │   └── queryRoutes.js
│   │   │
│   │   ├── services/
│   │   │   ├── llmService.js
│   │   │   ├── logger.js
│   │   │   └── sqlExecutor.js
│   │   │
│   │   ├── utils/
│   │   │   ├── formateResults.js
│   │   │   └── validateInput.js
│   │   │
│   │   ├── app.js
│   │   ├── server.js
│   │   └── seedAssignment.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── assets/
│   │   │   └── react.svg
│   │   │
│   │   ├── components/
│   │   │   ├── AssignmentCard.jsx
│   │   │   ├── AssignmentsView.jsx
│   │   │   ├── AttemptView.jsx
│   │   │   ├── LoginSignup.jsx
│   │   │   ├── ResultsTable.jsx
│   │   │   ├── SQLEditor.jsx
│   │   │   ├── SQLStudio.jsx
│   │   │   └── SchemaViewer.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.scss
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md
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

OpenAI/huggingface generates hint (if requested)

Backend sends response to frontend

Results displayed in table format

(Hand-drawn DFD included in submission)

👨‍💻 Author

Rites Maurya

This project is built for educational purposes.
**
