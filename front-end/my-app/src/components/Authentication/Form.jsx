import React from "react";

function Form({ setUsername, setPassword, onSubmit }) {
  return (
    <div className="card">
      <div className="card-body">
        <form className="form-group" onSubmit={onSubmit}>
          <input
            type="username"
            placeholder="What's your username?"
            className="form-control"
            id="inputUsername"
            aria-describedby="emailHelp"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            id="inputPassword"
            onChange={(e) => setPassword(e.target.value)} // Set the password state
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
