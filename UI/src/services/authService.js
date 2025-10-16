// src/services/authService.js

// 🧩 Signup Service
export const signUpUser = async (formData) => {
  try {
    const response = await fetch("https://todo-s-be.vercel.app/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, data: { message: "Something went wrong" } };
  }
};

// 🧩 Login Service
export const loginUser = async (formData) => {
  try {
    const response = await fetch("https://todo-s-be.vercel.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, data: { message: "Something went wrong" } };
  }
};
