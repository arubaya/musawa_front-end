import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  Button, InputLabel, MenuItem, Select, TextField,
} from '@material-ui/core';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import '../../../styles/userProfilePage.css';
import { useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { userId } from '../../data/User';
import apiClient from '../../data/api';

function UserProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [birthDateString, setBirthDateString] = useState('');
  const [address, setAddress] = useState('');
  const [showButtonSave, setShowButtonSave] = useState('');
  const [showButtonAdd, setShowButtonAdd] = useState('');
  const [userID, setUserID] = useState(0);

  const handleBirthDateChange = (date) => {
    setBirthDate(date);
    const dateString = new Date(date);
    // console.log(`${dateString.getFullYear()}-${dateString.getMonth()}-${dateString.getDate()}`);
    setBirthDateString(`${dateString.getFullYear()}-${dateString.getMonth() + 1}-${dateString.getDate()}`);
  };
  const handleChangeSelect = (event) => {
    setGender(event.target.value);
  };
  const addressHandleChange = (e) => {
    setAddress(e.target.value);
  };
  const nameHandleChange = (e) => {
    setName(e.target.value);
  };
  const emailHandleChange = (e) => {
    setEmail(e.target.value);
  };
  const phoneHandleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleClickAdd = () => {
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.post('/api/user/identity/add', {
        userId: userID,
        gender,
        birthDate: birthDateString,
        phoneNumber,
        address,
      }).then((res) => {
        console.log(res);
        setShowButtonAdd('');
        setShowButtonSave('show');
      });
    });
  };

  const handleClickSave = () => {
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.post(`/api/user/identity/update/${userID}`, {
        gender,
        birthDate: birthDateString,
        phoneNumber,
        address,
      }).then((res) => {
        console.log(res);
      });
      apiClient.post(`/api/user/update/${userID}`, {
        name,
        email,
      }).then((res) => {
        console.log(res);
      });
    });
  };

  useEffect(() => {
    const Id = Cookies.get('id');
    setUserID(Id);
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.get(`/api/user/identity/${Id}`).then((res) => {
        if (res.data.length === 0) {
          console.log('Data kosong');
          setShowButtonAdd('show');
          setShowButtonSave('');
          apiClient.get(`/api/user/${Id}`).then((resUser) => {
            // console.log(resUser.data[0].name);
            setName(resUser.data[0].name);
            setEmail(resUser.data[0].email);
          });
        } else {
          console.log(res.data);
          setName(res.data[0].name);
          setEmail(res.data[0].email);
          setPhoneNumber(res.data[0].phone_number);
          setBirthDate(new Date(res.data[0].birthday).toISOString());
          setGender(res.data[0].gender);
          setAddress(res.data[0].address);
          setShowButtonAdd('');
          setShowButtonSave('show');
        }
      });
    });
  }, []);

  return (
    <main>
      <section id="profilePage">
        <h4 className="profile-section-title">Profile</h4>
        <div className="user-avatar-container">
          <AccountCircleIcon />
        </div>
        <form className="profile-form" autoComplete="off">
          <div className="profile-item">
            <TextField
              id="nameProfile"
              label="Full Name"
              value={name}
              fullWidth
              onChange={nameHandleChange}
            />
          </div>
          <div className="profile-item">
            <TextField
              id="emailProfile"
              className="profile-item"
              label="Email"
              value={email}
              fullWidth
              onChange={emailHandleChange}
            />
          </div>
          <div className="profile-item">
            <TextField
              id="phoneProfile"
              className="profile-item"
              label="Phone Number"
              value={phoneNumber}
              fullWidth
              onChange={phoneHandleChange}
            />
          </div>
          <div className="profile-item">
            <InputLabel id="genderLabel">Gender</InputLabel>
            <Select
              labelId="genderLabel"
              id="genderSelect"
              value={gender}
              onChange={handleChangeSelect}
              fullWidth
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="none">None</MenuItem>
            </Select>
          </div>
          <div className="profile-item">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                inputVariant="standard"
                format="MM/dd/yyyy"
                margin="normal"
                id="birthDate"
                label="Birth Date"
                value={birthDate}
                onChange={handleBirthDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className="profile-item">
            <TextField
              id="outlined-multiline-static"
              label="Address"
              multiline
              rows={3}
              fullWidth
              variant="standard"
              value={address}
              onChange={addressHandleChange}
            />
          </div>
        </form>
        <Button className={`button-profile-change ${showButtonSave}`} onClick={handleClickSave} color="primary">Save Change</Button>
        <Button className={`button-profile-change ${showButtonAdd}`} onClick={handleClickAdd} color="primary">Add Data</Button>
      </section>
    </main>
  );
}

export default UserProfilePage;
