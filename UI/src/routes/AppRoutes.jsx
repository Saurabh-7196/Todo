import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import Signup from "../components/Signup";
import Login from "../pages/Login";

export default function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Protected pages */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />

      {/* Public page (Login) */}
      <Route
        path="/login"
        element={token ? <Navigate to="/" /> : <Login />}
      />
            <Route
        path="/signup"
        element={token ? <Navigate to="/" /> : <Signup />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
