import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Router from './route/Router';

import { userLogin, userRole } from './data/User';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#445A80',
    },
    secondary: {
      main: '#222D40',
    },
    light: {
      main: '#FFF',
    },
    lightGrey: {
      main: '#F1F1F1',
    },
    darkGrey: {
      main: '#7E7E7E',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
});

function App() {
  const [auth, setAuth] = useRecoilState(userLogin);
  const role = useRecoilValue(userRole);

  useEffect(() => {
    // setAuth(Cookies.get('LoggedIn'));
    if (auth) {
      console.log('cek session true');
      // setRole(sessionStorage.getItem('id'));
    }
    console.log(auth);
    console.log(role);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
