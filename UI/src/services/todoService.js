// src/services/todoService.js
const BASE_URL = 'https://todo-s-be.vercel.app/api/todos';
// const BASE_URL = 'http://localhost:3000/api/todos';

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getTodos = async () => {
  try {
    const res = await fetch(`${BASE_URL}/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
         ...getAuthHeader(),
      },
    });
    
    if (!res.ok) {
      const errorData = await res.text();
      console.error('Server response:', res.status, errorData);
      throw new Error(`HTTP ${res.status}: ${errorData}`);
    }
    
    return await res.json();
  } catch (err) {
    console.error('Error fetching todos:', err);
    throw err; // Let the UI handle the error
  }
};

// Add a new todo
export const addTodo = async (title, isCompleted = false) => {
  try {
    const res = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' , ...getAuthHeader(),},
      body: JSON.stringify({
        title,
        isCompleted,
        createdAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error('Failed to add todo');
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Update a todo (toggle completed or update title)
export const updateTodo = async (id, updatedFields) => {
  try {
    const res = await fetch(`${BASE_URL}/update/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(), },
      body: JSON.stringify(updatedFields),
    });
    if (!res.ok) throw new Error('Failed to update todo');
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Delete a todo (soft delete)
export const deleteTodo = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(), },
    });
    if (!res.ok) throw new Error('Failed to delete todo');
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
