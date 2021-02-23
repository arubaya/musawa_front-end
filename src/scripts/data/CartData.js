const { atom } = require('recoil');

const cartData = atom({
  key: 'cart',
  default: {
    userId: 0,
    roomName: '',
    roomType: '',
    roomId: 0,
    price: 0,
    total: 0,
    checkIn: '',
    checkOut: '',
    checkInDate: '',
    checkOutDate: '',
    guest: 0,
    night: 0,
  },
});

export default cartData;
