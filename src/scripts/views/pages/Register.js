import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { NavLink, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userLogin } from '../../data/User';
import apiClient from '../../data/api';
import colorLogo from '../../../images/color-logo.png';

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
  const [open, setOpen] = useState(false);
  const [loginProgress, setLoginProgress] = useState(false);

  const setAuth = useSetRecoilState(userLogin);
  const history = useHistory();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const redirectToOrder = () => {
    setOpen(false);
    history.push('/profile');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoginProgress(true);
    console.log(name, email, password);
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.post('/register', {
        role: 'user',
        name,
        email,
        password,
        confirm_password: confirmPassword,
      }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          setAuth(true);
          Cookies.set('loggedIn', true);
          Cookies.set('id', res.data.user.id);
          Cookies.set('role', res.data.user.role);
          setLoginProgress(false);
          setOpen(true);
          // history.push('/user');
        }
      }).catch((res) => {
        setLoginProgress(false);
        console.log(res);
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
        <div className="login-regis-logo">
          <img src={colorLogo} alt="Musawa Logo" />
        </div>
        <div className="line" />
        <div className="login-container">
          <h3>Register</h3>
          <form onSubmit={submitHandler} className="login-form" noValidate autoComplete="off">
            <TextField
              autoFocus
              id="filledName"
              label="Name"
              color="primary"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="filledEmail"
              label="Email"
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
              color="primary"
              type="password"
              name="password"
              error={errorConfirmPassword}
              helperText={errTextConfirmPassword}
              onChange={(e) => checkValidate(e, 'confirm password')}
            />
            <button className="login-button" type="submit">
              {loginProgress ? (
                <CircularProgress size={20} color="light" />
              ) : (
                'Register'
              )}
            </button>
          </form>
          <p className="text-link-to">
            Already have an account?
            <NavLink className="link-to" to="/login">
              Log in
            </NavLink>
          </p>
          <Dialog
            open={open}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Your account has been successfully registered</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please complete your profile
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={redirectToOrder} color="primary" autoFocus>
                Open Profile
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </section>
    </main>
  );
}

export default Register;
