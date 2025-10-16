import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import navigate

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate(); // ✅ Initialize navigation
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://todo-s-be.vercel.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        login(data.token); // ✅ Save token to context + localStorage
        navigate("/"); // ✅ Redirect to main/home page
      } else {
        alert(data.message || "Invalid credentials");
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
      <Typography variant="h5" color="white">Login</Typography>

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
        onClick={handleLogin}
        sx={{ mt: 2, width: 300 }}
      >
        Login
      </Button>

      <Typography variant="body2" color="white" sx={{ mt: 2 }}>
        Don’t have an account?{" "}
        <Link to="/signup" style={{ color: "#90caf9", textDecoration: "none" }}>
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
}
