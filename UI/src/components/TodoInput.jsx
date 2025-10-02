import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

const TodoInput = ({ onAdd }) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input);
    setInput('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#1c1c1c',
        borderRadius: '20px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: 700,
      }}
    >
      <Box sx={{ flex: 1, display: 'flex' }}>
        <TextField
          fullWidth
          size='small'
          variant="standard"
          placeholder="Add a task."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          InputProps={{
            disableUnderline: true,
            sx: {
              px: 2,
              py: 1,
              color: 'white',
              '&::placeholder': { color: '#aaa' },
            },
          }}
        />
      </Box>

      <Button
        onClick={handleAdd}
        size='large'
        sx={{
          bgcolor: '#f5dada',
          color: 'black',
          borderRadius: 0,
          borderTopRightRadius: '20px',
          borderBottomRightRadius: '20px',
          px: 3,
          // mr:0.5,
          '&:hover': {
            bgcolor: '#f2cfcf',
          },
        }}
      >
        I Got This!
      </Button>
    </Box>
  );
};

export default TodoInput;
