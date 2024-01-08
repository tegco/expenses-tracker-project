import React, { useState } from "react";

const FormComponent = ({ onSubmit, buttonText, fields }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (fieldName, value) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the formData object to the onSubmit function
    onSubmit(e, formData);
  };

  return (
    <div className="card">
      <div className="card-body">
        <form className="form-group" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name}>
              <label>{field.label || ""}</label>
              <input
                type={field.type || "text"}
                placeholder={field.placeholder || ""}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            </div>
          ))}
          <button type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
