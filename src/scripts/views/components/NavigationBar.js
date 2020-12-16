/* eslint-disable no-unused-vars */
import React from 'react';
import Cookies from 'js-cookie';
import { NavLink, useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userLogin } from '../../data/User';
import apiClient from '../../data/api';
import scrollTo from '../../utilities/scrollTo';

function NavigationBar() {
  // const [auth, setAuth] = useRecoilState(userLogin);
  const [auth, setAuth] = useRecoilState(userLogin);
  const history = useHistory();

  const onClickHandler = () => {
    apiClient.post('/logout').then((response) => {
      if (response.status === 204) {
        setAuth(false);
        sessionStorage.setItem('loggedIn', false);
        sessionStorage.removeItem('id');
        history.push('/');
      }
    });
  };

  return (
    <header id="header">
      {/* <button id="navbarToggle">
      <i className="material-icons-round">menu</i>
    </button> */}
      <h1 id="nameBrand">Homestay Musawa</h1>
      {/* <div className="add" style="width: 44px; height: 44px" /> */}

      <nav id="navbar">
        <div className="link active">
          <NavLink activeClassName="active" to="/">
            HOME
          </NavLink>
        </div>

        {/* <div className="link">
          <NavLink activeClassName="active" to="/">
            SERVICES
          </NavLink>
        </div> */}
        <div className="scrollTo-button">
          <button className="nav-button" type="button" onClick={() => scrollTo('services')}>SERVICES</button>
        </div>

        {/* <div className="link">
          <NavLink activeClassName="active" to="/">
            CONTACT
          </NavLink>
        </div> */}
        <div className="scrollTo-button">
          <button className="nav-button" type="button" onClick={() => scrollTo('contact')}>CONTACT</button>
        </div>
      </nav>
      {auth ? (
        <div className="logout-button">
          <button type="button" onClick={onClickHandler}>LOGOUT</button>
        </div>
      )
        : (
          <div className="login-button">
            <NavLink to="/login">LOGIN</NavLink>
          </div>
        )}
    </header>

  );
}

export default NavigationBar;
