import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("https://todo-s-be.vercel.app/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful! Please log in.");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(to bottom, black, #2e2e2e)",
        gap: 2,
      }}
    >
      <Typography variant="h5" color="white">Sign Up</Typography>

      <TextField
        label="Name"
        name="name"
        variant="outlined"
        value={form.name}
        onChange={handleChange}
        sx={{ background: "white", borderRadius: 1, width: 300 }}
      />
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        value={form.email}
        onChange={handleChange}
        sx={{ background: "white", borderRadius: 1, width: 300 }}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        value={form.password}
        onChange={handleChange}
        sx={{ background: "white", borderRadius: 1, width: 300 }}
      />
      <Button
        variant="contained"
        onClick={handleSignUp}
        sx={{ mt: 2, width: 300 }}
      >
        Sign Up
      </Button>
    </Box>
  );
}
