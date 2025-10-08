// api/index.js
import express from 'express';
import connectDB from './config/db.js';
import todoRoutes from './routes/todo.routes.js';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors({
  origin: 'https://todo-two-iota-86.vercel.app',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

app.use(express.json());

app.use('/api/todos', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
}, todoRoutes);

app.use(errorHandler);

export default app; // ✅ export instead of listen
