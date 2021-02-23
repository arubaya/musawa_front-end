import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import navState from '../../utilities/navigationState';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      zIndex: 990,
      boxShadow: '0 0 6px rgba(128, 128, 128, 0.281)',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function BottomNavBar() {
  const classes = useStyles();
  const [value, setValue] = useRecoilState(navState);
  const history = useHistory();
  // const bottomMenu = () => {

  // }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 'home') {
      history.push('/');
    } else if (newValue === 'profile') {
      history.push('/profile');
    } else if (newValue === 'order') {
      history.push('/order');
    } else if (newValue === 'booking') {
      history.push('/booking');
    }
  };

  return (
    <BottomNavigation value={value} showLabels onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Home" value="home" icon={<HomeOutlinedIcon />} />
      <BottomNavigationAction label="Booking" value="booking" icon={<TodayOutlinedIcon />} />
      <BottomNavigationAction label="Order" value="order" icon={<ReceiptOutlinedIcon />} />
      <BottomNavigationAction label="Profile" value="profile" icon={<PersonOutlinedIcon />} />
    </BottomNavigation>
  );
}

export default BottomNavBar;
