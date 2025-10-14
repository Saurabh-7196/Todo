import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';
import ensureDBConnection from './middleware/ensureDBConnection.js';
import todoRoutes from './routes/todo.routes.js';
import authRoutes from './routes/auth.routes.js';  // ✅ Added

const app = express();

const allowedOrigins = [
  "https://todo-two-iota-86.vercel.app", // production frontend
  "http://localhost:5173", // Vite local dev
  "http://localhost:3000", // fallback local dev (React default)
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman) or from allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`Blocked CORS request from: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(ensureDBConnection);

// ✅ Add auth routes
app.use('/api/auth', authRoutes);

// ✅ Todo routes (can be protected inside the routes file)
app.use('/api/todos', todoRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// ✅ Only start server locally (Vercel uses serverless functions)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const startServer = async () => {
    try {
      await connectDB();
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      process.exit(1);
    }
  };
  startServer();
}

export default app;
