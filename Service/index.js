import express from 'express';
import connectDB from './config/db.js';
import todoRoutes from './routes/todo.routes.js';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// ✅ Allow both your frontend and local dev
const allowedOrigins = [
  'https://todo-two-iota-86.vercel.app',
  'http://localhost:5173',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ✅ Important: handle OPTIONS preflight
app.options('*', cors());

app.use(express.json());

// ✅ Connect DB before routes
app.use('/api/todos', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
}, todoRoutes);

app.use(errorHandler);

// ✅ This must be default export for Vercel
export default app;
