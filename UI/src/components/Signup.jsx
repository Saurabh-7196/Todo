import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { signUpUser } from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    const { success, data } = await signUpUser(form);
    if (success) {
      alert("Signup successful! Please log in.");
      navigate("/login");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  const inputStyles = {
    backgroundColor: "#1c1c1c",
    borderRadius: 2,
    width: 300,
    "& .MuiOutlinedInput-root": {
      height: 50,
      color: "white",
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
      color: "#aaa",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#90caf9",
    },
  };

  return (
    <Box
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
            Join us and start organizing your daily goals efficiently.
          </Typography>
        </Box>
      )}

      {/* RIGHT SECTION - Signup Form */}
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
          label="Name"
          name="name"
          variant="outlined"
          value={form.name}
          onChange={handleChange}
          sx={inputStyles}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          value={form.email}
          onChange={handleChange}
          sx={inputStyles}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          value={form.password}
          onChange={handleChange}
          sx={inputStyles}
        />

        <Button
          variant="contained"
          onClick={handleSignUp}
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
          Sign Up
        </Button>

        <Typography variant="body2" color="white" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#90caf9", textDecoration: "none" }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
