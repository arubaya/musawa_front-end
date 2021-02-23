import { InputAdornment, TextField } from '@material-ui/core';
import React from 'react';

function CompleteProfilePage() {
  const submitHandler = (e) => {
    // e.preventDefault();
    // apiClient.get('/sanctum/csrf-cookie').then(() => {
    //   apiClient.post('/register', {
    //     name,
    //     email,
    //     password,
    //     confirm_password: confirmPassword,
    //   }).then((res) => {
    //     // console.log(res);
    //     if (res.status === 200) {
    //       setAuth(true);
    //       sessionStorage.setItem('loggedIn', true);
    //       sessionStorage.setItem('id', res.data.user.id);
    //       history.push('/user');
    //     }
    //   });
    // });
  };
  return (
    <main id="completeProfilePage">
      <h2>Please complete your profile</h2>
      <div className="complete-profile-container">
        <form onSubmit={submitHandler} className="login-form" noValidate autoComplete="off">
          <TextField
            label="Phone number"
            id="standard-start-adornment"
            InputProps={{
              startAdornment: <InputAdornment position="start">+62</InputAdornment>,
            }}
          />
          <TextField
            autoFocus
            id="filledName"
            label="Name"
            color="primary"
            type="text"
            name="name"
            // onChange={(e) => setName(e.target.value)}
          />
          <button className="save-button" type="submit">Save</button>
        </form>
      </div>
    </main>
  );
}

export default CompleteProfilePage;
