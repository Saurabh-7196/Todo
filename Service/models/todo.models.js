import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // 👇 New field — link todo to a specific user
  user: {
    type: mongoose.Schema.Types.ObjectId, // store user ID
    ref: 'User', // refers to your User model
    required: true, // each todo must belong to someone
  },
});

export default mongoose.model('Todo', todoSchema);
