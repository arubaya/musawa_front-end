function checkValidateEmail(e) {
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let errorEmail;
  let errTextEmail;
  let email;
  if (e.target.value === '') {
    errorEmail = false;
    errTextEmail = '';
    email = e.target.value;
  } else if (e.target.value.match(mailformat)) {
    errorEmail = false;
    errTextEmail = '';
    email = e.target.value;
  } else {
    errorEmail = true;
    errTextEmail = 'Sorry, this is not a valid email';
    email = '';
  }

  return [errorEmail, errTextEmail, email];
}

function checkValidatePassword(e) {
  let errorPassword;
  let errTextPassword;
  let password;
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
