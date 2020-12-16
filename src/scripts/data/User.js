const { atom } = require('recoil');

const userLogin = atom({
  key: 'authenticated',
  default: sessionStorage.getItem('loggedIn') === 'true' || false,
});

const userRole = atom({
  key: 'role',
  default: sessionStorage.getItem('id'),
});

export { userLogin, userRole };
