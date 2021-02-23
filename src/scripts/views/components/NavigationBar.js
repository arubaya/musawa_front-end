/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import $ from 'jquery';

import { Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import '../../../styles/navbar.css';

import { userLogin } from '../../data/User';
import apiClient from '../../data/api';

import whiteLogo from '../../../images/white-logo.png';
import colorLogo from '../../../images/color-logo.png';

function NavigationBar(props) {
  const [auth, setAuth] = useRecoilState(userLogin);
  const [logo, setLogo] = useState(whiteLogo);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [navbarShow, setNavbarShow] = useState('show');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { solid, scrollChange } = props;

  const { id } = useParams();

  const scrollTo = (targetElement) => {
    if (id) {
      history.push('/');
      setTimeout(() => {
        const target = document.querySelector(`#${targetElement}`);
        document.documentElement.scrollTop = target.offsetTop - 70;
      }, 500);
    } else {
      console.log('home');
      const target = document.querySelector(`#${targetElement}`);
      document.documentElement.scrollTop = target.offsetTop - 70;
    }
  };

  const addClassSolid = () => {
    $('#header').addClass('solid');
    $('#nameBrand').addClass('solid');
    $('#navbar > .link').addClass('solid');
    $('.nav-button').addClass('solid');
    $('.button-profile').addClass('solid');
    setLogo(colorLogo);
  };

  const removeClassSolid = () => {
    $('#header').removeClass('solid');
    $('#nameBrand').removeClass('solid');
    $('#navbar > .link').removeClass('solid');
    $('.nav-button').removeClass('solid');
    $('.button-profile').removeClass('solid');
    setLogo(whiteLogo);
  };

  $(window).scroll(function () {
    if (scrollChange === 'true') {
      const wScroll = $(this).scrollTop();
      if (wScroll > 60) {
        addClassSolid();
      } else {
        removeClassSolid();
      }
    } else {
      addClassSolid();
    }
  });

  useEffect(() => {
    if (solid === 'true') {
      addClassSolid();
    } else {
      removeClassSolid();
    }
  }, [solid]);

  useEffect(() => {
    if (Cookies.get('role') === 'admin') {
      setNavbarShow('');
    } else if (Cookies.get('role') === 'user') {
      setNavbarShow('show');
    } else {
      setNavbarShow('show');
    }
  }, []);

  const onClickHandler = () => {
    setAnchorEl(null);
    apiClient.post('/logout').then((response) => {
      if (response.status === 204) {
        setAuth(false);
        Cookies.set('loggedIn', false);
        Cookies.remove('id');
        Cookies.remove('role');
        Cookies.remove('XSRF-TOKEN');
        Cookies.remove('musawa_session');
        history.push('/');
      }
    });
  };

  return (
    <header id="header">
      <img className="logo" src={logo} alt="Musawa Logo" />
      <nav id="navbar" className={navbarShow}>
        <div className="link">
          <NavLink to="/">
            HOME
          </NavLink>
        </div>
        {auth ? (
          <div className="link">
            <NavLink to="/booking">
              ROOMS
            </NavLink>
            <NavLink to="/order">
              ORDER
            </NavLink>
          </div>
        )
          : (
            <div className="scrollTo-button-container">
              <div className="scrollTo-button">
                <button className="nav-button" type="button" onClick={() => scrollTo('services')}>SERVICES</button>
              </div>
              <div className="scrollTo-button">
                <button className="nav-button" type="button" onClick={() => scrollTo('contact')}>CONTACT</button>
              </div>
            </div>
          )}
      </nav>

      <button type="button" className="button-profile" onClick={handleClick}>
        <div className="menu-icon">
          <MenuIcon />
        </div>
        <div className="profile-icon">
          <AccountCircleIcon />
        </div>
      </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {auth ? (
          <div>
            <MenuItem onClick={onClickHandler}>
              <div className="logout-button">
                <button type="button">Logout</button>
              </div>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <div className={`menu-item-link ${navbarShow}`}>
                <NavLink to="/profile">Profile</NavLink>
              </div>
            </MenuItem>
          </div>
        )
          : (
            <div>
              <MenuItem onClick={handleClose}>
                <div className="menu-item-link show">
                  <NavLink to="/login">Login</NavLink>
                </div>
              </MenuItem>
            </div>
          )}
      </Menu>
    </header>
  );
}

export default NavigationBar;
