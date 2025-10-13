import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';
import todoRoutes from './routes/todo.routes.js';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// CORS setup
const allowedOrigins = [
  'https://todo-two-iota-86.vercel.app',
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/api/todos', todoRoutes);
app.use(errorHandler);

// ✅ Start only *after* DB connection is ready
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(); // wait for MongoDB to connect
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

startServer();

export default app;
