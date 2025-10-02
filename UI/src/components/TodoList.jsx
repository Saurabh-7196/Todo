import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';

const TodoList = ({ todos, onToggle, onDelete }) => {
  return (
    <Box
      sx={{
        p: 3,
        width: '500px',
        margin: '0 auto',
        backgroundColor: 'transparent',
      }}
    >
      {/* Scrollable container */}
      <Box
        sx={{
          px: 2,
          maxHeight: '800px', 
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent', 
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255,255,255,0.3)', 
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(255,255,255,0.5)',
          },
          scrollbarWidth: 'thin', 
          scrollbarColor: 'rgba(255,255,255,0.3) transparent',
        }}
      >
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {todos.map((todo, index) => (
            <Grow
              in={true}
              style={{ transformOrigin: '0 0 0' }}
              timeout={500 + index * 200}
              key={todo._id}
            >
              <ListItem
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: '50px',
                  px: 2,
                  py: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <ListItemText
                  primary={todo.title}
                  sx={{
                    textDecoration: todo.isCompleted ? 'line-through' : 'none',
                    color: 'white',
                  }}
                />
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Checkbox
                    checked={todo.isCompleted}
                    onChange={() => onToggle(todo._id, !todo.isCompleted)}
                    sx={{
                      color: 'white',
                      '&.Mui-checked': { color: 'white' },
                    }}
                  />
                  <IconButton onClick={() => onDelete(todo._id)}>
                    <DeleteIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Box>
              </ListItem>
            </Grow>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default TodoList;
