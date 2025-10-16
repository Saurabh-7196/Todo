import { useState, useEffect } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { getTodos, addTodo, updateTodo, deleteTodo } from './services/todoService';
import { useAuth } from './context/AuthContext'; // ✅ import useAuth

const App = () => {
  const { logout } = useAuth(); // ✅ get logout function
  const [todos, setTodos] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data.todos || []);
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const day = days[now.getDay()];
      setCurrentTime(`${hours}:${minutes} ${day}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 60000);
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
        pt: 10,
      }}
    >
      {/* Sign Out Button */}
      <Box sx={{ alignSelf: 'flex-end', pr: 5 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={logout}
        >
          Sign Out
        </Button>
      </Box>

      <Typography variant="h1" component="h1" sx={{ color: 'white', letterSpacing: '8px' }}>
        Just do it.
      </Typography>

      <TodoInput onAdd={handleAdd} />

      <Typography sx={{ color: 'grey', mt: 2, fontSize: '18px' }}>
        {currentTime}
      </Typography>

      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </Box>
  );
};

export default App;
