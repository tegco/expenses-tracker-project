import React from 'react';

function Authentication(){
    return <div class="card">
    <div class="card-body">
    <h>Login</h> 
    <br/><br/>
    <form>
  <div class="form-group">
    <label for="inputUsername">What's your username?</label>
    <input type="username" class="form-control" id="inputUsername" aria-describedby="emailHelp"/>
  </div> 
  <div class="form-group">
    <label for="inputPassword">Password</label>
    <input type="password" class="form-control" id="inputPassword"/>
  </div> <br/>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

<p>OR</p>
  <button>Create new account</button>
    </div>
  </div>

}

export default Authentication;