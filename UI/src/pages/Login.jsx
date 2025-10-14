import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { Box, Button } from "@mui/material";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box>
      {isLogin ? <Login /> : <Signup />}
      <Box textAlign="center" mt={2}>
        <Button
          variant="text"
          onClick={() => setIsLogin(!isLogin)}
          sx={{ color: "white" }}
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </Button>
      </Box>
    </Box>
  );
}
