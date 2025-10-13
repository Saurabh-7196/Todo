import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';
import todoRoutes from './routes/todo.routes.js';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';
import ensureDBConnection from './middleware/ensureDBConnection.js'; // Add this

const app = express();

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
app.use(ensureDBConnection); // Add this middleware before routes
app.use('/api/todos', todoRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Only start server in non-serverless environments
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const startServer = async () => {
    try {
      await connectDB(); 
      app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      process.exit(1);
    }
  };
  startServer();
}

export default app;