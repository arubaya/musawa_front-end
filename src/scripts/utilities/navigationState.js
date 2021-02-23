const { atom } = require('recoil');

const navState = atom({
  key: 'navigation',
  default: 'home',
});

export default navState;
