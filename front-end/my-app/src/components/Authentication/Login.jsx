import React, { useState } from "react";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // Adjust the path based on your project structure

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the login API
      const { token } = await api.routes.login(username, password);

      // Attach the JWT token to the Authorization header for subsequent requests
      api.apiInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      // Store the JWT token in localStorage
      localStorage.setItem("token", token);
      // Optionally: Redirect the user to another page (e.g., dashboard)
      navigate("/dashboard"); // Adjust the route as needed
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div class="card">
      <div class="card-body">
        <h4>Login</h4>

        <Form
          setUsername={setUsername}
          setPassword={setPassword}
          onSubmit={handleLogin}
        />

        <p>OR</p>
        <button>Register</button>
      </div>
    </div>
  );
}

export default Login;
