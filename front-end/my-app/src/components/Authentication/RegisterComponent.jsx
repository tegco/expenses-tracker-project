import React, { useState } from "react";
import FormComponent from "./FormComponent";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

function RegisterComponent() {
  const navigate = useNavigate();

  const handleRegistration = async (e, formData) => {
    e.preventDefault();

    try {
      await api.routes.register(formData.username, formData.password);

      // Optionally: Redirect the user to another page
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const registrationFields = [
    { name: "username", placeholder: "Choose a  username:" },
    { name: "password", placeholder: "Choose a password:", type: "password" },
    {
      name: "confirmPassword",
      placeholder: "Confirm password:",
      type: "password",
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h4>Hello!</h4>

        <FormComponent
          fields={registrationFields}
          onSubmit={handleRegistration}
          buttonText="Register"
        />

        <p>OR</p>

        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default RegisterComponent;
