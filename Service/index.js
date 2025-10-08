import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import todoRoutes from './routes/todo.routes.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'https://todo-two-iota-86.vercel.app', // your Vite app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  
}));app.use(express.json()); // No need for body-parser separately

// Routes with DB connection per request
app.use('/api/todos', async (req, res, next) => {
  try {
    await connectDB(); // Uses cached connection
    next();
  } catch (err) {
    next(err);
  }
}, todoRoutes);

// Error middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
