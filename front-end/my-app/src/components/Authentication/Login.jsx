import React, { useState } from "react";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

/*
Input fields for username and password.
"Login" button.
Link to the registration page.
*/

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
      // Optionally: Redirect the user to another page
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
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
