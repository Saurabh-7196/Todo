import express from 'express';
import { getTodos, addTodo, toggleTodo, deleteTodo } from '../controller/todo.controller.js';
import {protect} from '../middleware/auth.js';

const router = express.Router();

// GET all todos
router.get('/list',protect, getTodos);

// POST a new todo
router.post('/add',protect, addTodo);

// PATCH to update a todo (toggle isCompleted or update title)
router.patch('/update/:id',protect, toggleTodo);

// DELETE (soft delete)
router.delete('/delete/:id',protect, deleteTodo);

export default router;
