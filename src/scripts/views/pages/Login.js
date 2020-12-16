import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import '../../../styles/login.css';
import apiClient from '../../data/api';
import { userLogin, userRole } from '../../data/User';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errTextEmail, setErrTextEmail] = useState('');
  const [errTextPassword, setErrTextPassword] = useState('');

  const setAuth = useSetRecoilState(userLogin);
  const setRole = useSetRecoilState(userRole);
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.post('/login', {
        email,
        password,
      }).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setAuth(true);
          sessionStorage.setItem('loggedIn', true);
          sessionStorage.setItem('id', res.data.user.id);
          setRole(sessionStorage.getItem('id'));
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
        setErrTextPassword('Your password must be at least 6 characters');
      } else if (e.target.value.length >= 8) {
        setErrorPassword(false);
        setErrTextPassword('');
        setPassword(e.target.value);
      }
    }
  };

  return (
    <main>
      <section id="loginPage">
        <div className="login-container">
          <h3>Log in</h3>
          <form onSubmit={submitHandler} className="login-form" noValidate autoComplete="off">
            <TextField
              id="filledEmail"
              label="Email"
              variant="outlined"
              color="primary"
              type="email"
              name="email"
              error={errorEmail}
              helperText={errTextEmail}
              autoFocus
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
            <button className="login-button" type="submit" disabled>Log in</button>
          </form>
          <p className="text-link-to">
            Dont have an account?
            <NavLink className="link-to" to="/register">
              Register
            </NavLink>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
