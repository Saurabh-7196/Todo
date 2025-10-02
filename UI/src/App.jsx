import  { useState, useEffect } from 'react';
import  './App.css';
import Box from '@mui/material/Box';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { getTodos, addTodo, updateTodo, deleteTodo } from './services/todoService';
import Typography from '@mui/material/Typography';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  // Load todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data.todos || []);
    };
    fetchTodos();
  }, []);

  // Update time every minute
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const day = days[now.getDay()];
      setCurrentTime(`${hours}:${minutes} ${day}`);
    };

    updateClock(); // initialize immediately
    const interval = setInterval(updateClock, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  const handleAdd = async (title) => {
    const newTodo = await addTodo(title);
    if (newTodo) setTodos([...todos, newTodo]);
  };

  const handleToggle = async (id, isCompleted) => {
    const updated = await updateTodo(id, { isCompleted });
    if (updated) {
      setTodos(todos.map(todo => (todo._id === id ? updated : todo)));
    }
  };

  const handleDelete = async (id) => {
    const success = await deleteTodo(id);
    if (success) setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(to bottom, black, #2e2e2e)', 
        gap: 2,
        pt: 20,
      }}
    >
      <Typography variant="h1" component="h1" sx={{ color: 'white', letterSpacing: '8px' }}>
        Just do it.
      </Typography>

      <TodoInput onAdd={handleAdd} />

      {/* Time and Day */}
      <Typography  sx={{ color: 'grey', mt: 2, fontSize: '18px' }}>
        {currentTime}
      </Typography>

      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </Box>
  );
};

export default App;
