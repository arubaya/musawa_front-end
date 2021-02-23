import Cookies from 'js-cookie';

const { atom } = require('recoil');

const userLogin = atom({
  key: 'authenticated',
  default: Cookies.get('loggedIn') === 'true' || false,
});

const userId = atom({
  key: 'userID',
  default: Cookies.get('id'),
});

const userRole = atom({
  key: 'roleUser',
  default: Cookies.get('role'),
});

export { userLogin, userId, userRole };
