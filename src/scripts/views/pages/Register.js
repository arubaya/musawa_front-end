import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { useSetRecoilState } from 'recoil';
import { NavLink, useHistory } from 'react-router-dom';
import { userLogin } from '../../data/User';
import apiClient from '../../data/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errTextEmail, setErrTextEmail] = useState('');
  const [errTextPassword, setErrTextPassword] = useState('');
  const [errTextConfirmPassword, setErrTextConfirmPassword] = useState('');

  const setAuth = useSetRecoilState(userLogin);
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.post('/register', {
        name,
        email,
        password,
        confirm_password: confirmPassword,
      }).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setAuth(true);
          sessionStorage.setItem('loggedIn', true);
          sessionStorage.setItem('id', res.data.user.id);
          history.push('/user');
        }
      });
    });
  };

  const checkValidate = (e, field) => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (field === 'email') {
      if (e.target.value === '') {
        setErrorEmail(false);
        setErrTextEmail('');
        setEmail(e.target.value);
      } else if (e.target.value.match(mailformat)) {
        setErrorEmail(false);
        setErrTextEmail('');
        setEmail(e.target.value);
      } else {
        setErrorEmail(true);
        setErrTextEmail('Sorry, this is not a valid email');
      }
    }

    if (field === 'password') {
      if (e.target.value === '') {
        setErrorPassword(false);
        setErrTextPassword('');
        setPassword(e.target.value);
      } else if (e.target.value.length < 8) {
        setErrorPassword(true);
        setErrTextPassword('Your password must be at least 8 characters');
      } else if (e.target.value.length >= 8) {
        setErrorPassword(false);
        setErrTextPassword('');
        setPassword(e.target.value);
      }
    }

    if (field === 'confirm password') {
      if (e.target.value === '') {
        setErrorConfirmPassword(false);
        setErrTextConfirmPassword('');
        setConfirmPassword(e.target.value);
      } else if (e.target.value !== password) {
        setErrorConfirmPassword(true);
        setErrTextConfirmPassword('Your password not same');
      } else {
        setErrorConfirmPassword(false);
        setErrTextConfirmPassword('');
        setConfirmPassword(e.target.value);
      }
    }
  };

  return (
    <main>
      <section id="loginPage">
        <div className="login-container">
          <h3>Register</h3>
          <form onSubmit={submitHandler} className="login-form" noValidate autoComplete="off">
            <TextField
              autoFocus
              id="filledName"
              label="Name"
              variant="outlined"
              color="primary"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="filledEmail"
              label="Email"
              variant="outlined"
              color="primary"
              type="email"
              name="email"
              error={errorEmail}
              helperText={errTextEmail}
              onChange={(e) => checkValidate(e, 'email')}
            />
            <TextField
              id="filledPassword"
              label="Password"
              variant="outlined"
              color="primary"
              type="password"
              name="password"
              error={errorPassword}
              helperText={errTextPassword}
              onChange={(e) => checkValidate(e, 'password')}
            />
            <TextField
              id="filledConfirmPassword"
              label="Confirm Password"
              variant="outlined"
              color="primary"
              type="password"
              name="password"
              error={errorConfirmPassword}
              helperText={errTextConfirmPassword}
              onChange={(e) => checkValidate(e, 'confirm password')}
            />
            <button className="login-button" type="submit">Register</button>
          </form>
          <p className="text-link-to">
            Already have an account?
            <NavLink className="link-to" to="/login">
              Log in
            </NavLink>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
