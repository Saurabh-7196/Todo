import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "123456",
      }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      login(data.token); // Save token to context + localStorage
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
