import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth(); // Get token from context

  // If token doesn't exist, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the protected page
  return children;
}
