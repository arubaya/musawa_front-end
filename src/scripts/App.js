import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import '../styles/App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Router from './route/Router';

import { userLogin, userRole } from './data/User';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5F5850',
    },
    secondary: {
      main: '#F8E186',
    },
  },
});

function App() {
  const auth = useRecoilValue(userLogin);
  const [role, setRole] = useRecoilState(userRole);

  useEffect(() => {
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
