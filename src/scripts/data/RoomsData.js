const { atom } = require('recoil');

const roomsData = atom({
  key: 'rooms',
  default: [
    {
      id: 1,
      name: 'Single bed room',
      typeRoom: 'Single',
      pricePerNight: 200000,
    },
    {
      id: 2,
      name: 'Double bed room',
      typeRoom: 'Double',
      pricePerNight: 200000,
    },
    {
      id: 3,
      name: 'Meet room',
      typeRoom: 'Meet',
      pricePerNight: 200000,
    },
  ],
});

export default roomsData;
