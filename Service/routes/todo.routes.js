import express from 'express';
import { getTodos, addTodo, toggleTodo, deleteTodo } from '../controller/todo.controller.js';

const router = express.Router();

// GET all todos
router.get('/list', getTodos);

// POST a new todo
router.post('/add', addTodo);

// PATCH to update a todo (toggle isCompleted or update title)
router.patch('/update/:id', toggleTodo);

// DELETE (soft delete)
router.delete('/delete/:id', deleteTodo);

export default router;
