import Todo from '../models/todo.models.js';

// Get all todos with counts
export const getTodos = async (req, res) => {
  try {
    // All todos excluding deleted for display
    const todos = await Todo.find({ isDeleted: false });

    // Counts
    const totalCount = await Todo.countDocuments({ isDeleted: false });
    const totalCompleted = await Todo.countDocuments({ isCompleted: true, isDeleted: false });
    const totalDeleted = await Todo.countDocuments({ isDeleted: true });

    res.status(200).json({
      totalCount,
      totalCompleted,
      totalDeleted,
      todos,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Add a new todo
export const addTodo = async (req, res) => {
  const { title, isCompleted = false } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const newTodo = new Todo({
      title,
      isCompleted,
      isDeleted: false,
      createdAt: new Date()
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Toggle isCompleted
export const toggleTodo = async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Soft delete a todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndUpdate(id, { isDeleted: true });
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
