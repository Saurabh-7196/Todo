import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(); // Step 1: Create a Context object

export const AuthProvider = ({ children }) => {
  // Step 2: Create states to store token and user info
  const [token, setToken] = useState(null);

  // Step 3: On page load, check if user already has token in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Step 4: Define login method — called after successful login
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Step 5: Define logout method — removes token and resets state
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Step 6: Return the Context Provider so other components can access it
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Step 7: Create a custom hook for easy access
export const useAuth = () => useContext(AuthContext);
