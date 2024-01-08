import React, { useState } from "react";
import FormComponent from "./FormComponent";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

/*
Input fields for username and password.
"Login" button.
Link to the registration page.
*/

function LoginComponent() {
  const navigate = useNavigate();

  const handleLogin = async (e, formData) => {
    e.preventDefault();

    try {
      const response = await api.routes.login(
        formData.username,
        formData.password
      );

      // Handle successful login
      const { token } = response;
      api.apiInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response.data.errors);
      alert(error.response.data.errors);
    }
  };

  const loginFields = [
    { name: "username", placeholder: "Your Username" },
    { name: "password", placeholder: "Password", type: "password" },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h4>Hello!</h4>

        <FormComponent
          fields={loginFields}
          onSubmit={handleLogin}
          buttonText="Login"
        />

        <p>OR</p>

        <Link to="/register">
          <button>Create account</button>
        </Link>
      </div>
    </div>
  );
}

export default LoginComponent;
