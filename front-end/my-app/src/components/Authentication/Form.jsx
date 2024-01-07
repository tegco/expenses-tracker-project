import React from "react";

function Form({ setUsername, setPassword, onSubmit }) {
  return (
    <div class="card">
      <div class="card-body">
        <form class="form-group" onSubmit={onSubmit}>
          <input
            type="username"
            placeholder="What's your username?"
            class="form-control"
            id="inputUsername"
            aria-describedby="emailHelp"
            onChange={(e) => setUsername(e.target.value)} // Set the username state
          />
          <input
            type="password"
            placeholder="Password"
            class="form-control"
            id="inputPassword"
            onChange={(e) => setPassword(e.target.value)} // Set the password state
          />
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
