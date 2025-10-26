import Todo from '../models/todo.models.js';

// ✅ Get all todos for the logged-in user
export const getTodos = async (req, res) => {
  try {
    // Only fetch this user's todos (exclude deleted)
    const todos = await Todo.find({
      user: req.user._id,
      isDeleted: false,
    });

    // Counts for this user only
    const totalCount = await Todo.countDocuments({
      user: req.user._id,
      isDeleted: false,
    });

    const totalCompleted = await Todo.countDocuments({
      user: req.user._id,
      isCompleted: true,
      isDeleted: false,
    });

    const totalDeleted = await Todo.countDocuments({
      user: req.user._id,
      isDeleted: true,
    });

    res.status(200).json({
      totalCount,
      totalCompleted,
      totalDeleted,
      todos,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add a new todo linked to the current user
export const addTodo = async (req, res) => {
  const { title, isCompleted = false } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const newTodo = new Todo({
      title,
      isCompleted,
      isDeleted: false,
      createdAt: new Date(),
      user: req.user._id, // 👈 associate with logged-in user
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Toggle or update todo only if it belongs to the user
export const toggleTodo = async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id }, // only update user's todo
      { isCompleted },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Soft delete only user's own todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id }, // only delete user's todo
      { isDeleted: true },
      { new: true }
    );

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
