import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import CircularProgress from '@material-ui/core/CircularProgress';
import Cookies from 'js-cookie';

import '../../../styles/login.css';
import apiClient from '../../data/api';
import { userLogin, userRole } from '../../data/User';
import colorLogo from '../../../images/color-logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginProgress, setLoginProgress] = useState(false);

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errTextEmail, setErrTextEmail] = useState('');
  const [errTextPassword, setErrTextPassword] = useState('');

  const setAuth = useSetRecoilState(userLogin);
  const setRole = useSetRecoilState(userRole);

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    setLoginProgress(true);
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.post('/login', {
        email,
        password,
      }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          setAuth(true);
          Cookies.set('loggedIn', true);
          Cookies.set('id', res.data.user.id);
          Cookies.set('role', res.data.user.role);
          setRole(Cookies.get('id'));
          history.push('/user');
        }
      });
    }).catch((res) => {
      console.log(res);
      setLoginProgress(false);
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
  };

  return (
    <main>
      <section id="loginPage">
        <div className="login-regis-logo">
          <img src={colorLogo} alt="Musawa Logo" />
        </div>
        <div className="line" />
        <div className="login-container">
          <h3>Log in</h3>
          <form onSubmit={submitHandler} className="login-form" noValidate autoComplete="off">
            <TextField
              id="filledEmail"
              label="Email"
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
              color="primary"
              type="password"
              name="password"
              error={errorPassword}
              helperText={errTextPassword}
              onChange={(e) => checkValidate(e, 'password')}
            />
            <button className="login-button" type="submit">
              {loginProgress ? (
                <CircularProgress size={20} color="light" />
              ) : (
                'Log in'
              )}
            </button>
          </form>
          <p className="text-link-to">
            Don&lsquo;t have an account?
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
