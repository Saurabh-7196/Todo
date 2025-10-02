import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import todoRoutes from './routes/todo.routes.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';

const app = express();

app.use(cors());
dotenv.config();
const port = process.env.PORT || 3000;

// Connect to MongoDB
await connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Middleware
app.use(bodyParser.json());

app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);


// Error middleware
app.use(errorHandler);