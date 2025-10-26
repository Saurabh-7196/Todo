import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://todo-s-be.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok && data.token) {
        login(data.token);
        navigate("/");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const inputStyles = {
    backgroundColor: "#1c1c1c", // dark input background
    borderRadius: 2,
    width: 300,
    "& .MuiOutlinedInput-root": {
      height: 50,
      color: "white", // text color
      "& fieldset": {
        borderColor: "#555",
      },
      "&:hover fieldset": {
        borderColor: "#90caf9",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#90caf9",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#aaa", // label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#90caf9",
    },
  };

  return (
    <Box
      component="form"
      autoComplete="off" // ✅ Prevent browser autofill on form
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        backgroundColor: "#121212",
      }}
    >
      {/* LEFT SECTION - Quotes */}
      {!isMobile && (
        <Box
          sx={{
            flexBasis: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "white",
            textAlign: "center",
            background: "linear-gradient(to bottom right, #000, #333)",
            p: 4,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
            “Plan it. Do it. Achieve it.”
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 400, color: "#ccc" }}>
            Stay organized and focused with your daily goals.
          </Typography>
        </Box>
      )}

      {/* RIGHT SECTION - Login Form */}
      <Box
        sx={{
          flexBasis: isMobile ? "100%" : "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          p: 4,
        }}
      >
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          value={form.email}
          onChange={handleChange}
          sx={inputStyles}
          autoComplete="off" // ✅ Prevent browser suggestions
        />

        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={form.password}
          onChange={handleChange}
          sx={inputStyles}
          autoComplete="new-password" // ✅ Prevent browser password suggestions
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  sx={{ color: "#aaa" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            mt: 2,
            width: 300,
            height: 50,
            backgroundColor: "#5696c9ff",
            "&:hover": {
              backgroundColor: "#64b5f6",
            },
          }}
        >
          Login
        </Button>

        <Typography variant="body2" color="white" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "#90caf9", textDecoration: "none" }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
