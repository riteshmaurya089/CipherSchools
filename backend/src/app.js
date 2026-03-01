require("dotenv").config();
console.log("API KEY LOADED:", process.env.HF_API_KEY? "YES" : "NO");
const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/dbMongo');
const authRoutes = require('./routes/authRoutes');
const assignmentRoutes = require('./routes/AssignmentRoutes');
const queryRoutes = require('./routes/queryRoutes');
const hintRoutes = require('./routes/hintRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Connect MongoDB
connectMongo();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/hint', hintRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;