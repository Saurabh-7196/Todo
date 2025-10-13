import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/login";

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

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
