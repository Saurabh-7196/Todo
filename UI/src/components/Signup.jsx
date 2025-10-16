import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../services/authService"; // ✅ Import the signup service

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    const { success, data } = await signUpUser(form); // ✅ Use service
    if (success) {
      alert("Signup successful! Please log in.");
      navigate("/login");
    } else {
      alert(data.message || "Signup failed");
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
      <Typography variant="h5" color="white">
        Sign Up
      </Typography>

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
      <Button variant="contained" onClick={handleSignUp} sx={{ mt: 2, width: 300 }}>
        Sign Up
      </Button>
    </Box>
  );
}
