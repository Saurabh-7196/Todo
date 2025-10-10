// src/services/todoService.js
const BASE_URL = 'https://todo-service-5psy90725-saurabh-7196s-projects.vercel.app/api/todos';

// Fetch all todos
export const getTodos = async () => {
  try {
    const res = await fetch(`${BASE_URL}/list`);
    if (!res.ok) throw new Error('Failed to fetch todos');
    return await res.json();
  } catch (err) {
    console.error(err);
    return { totalCount: 0, todos: [] };
  }
};

// Add a new todo
export const addTodo = async (title, isCompleted = false) => {
  try {
    const res = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      headers: { 'Content-Type': 'application/json' },
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
    });
    if (!res.ok) throw new Error('Failed to delete todo');
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
