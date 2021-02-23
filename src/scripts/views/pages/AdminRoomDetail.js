/* eslint-disable radix */
import {
  Button,
  Divider, InputAdornment, Switch, TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import WifiIcon from '@material-ui/icons/Wifi';
import TvIcon from '@material-ui/icons/Tv';
import KitchenIcon from '@material-ui/icons/Kitchen';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import KingBedIcon from '@material-ui/icons/KingBed';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import PrintIcon from '@material-ui/icons/Print';
import VideocamIcon from '@material-ui/icons/Videocam';
import { useParams } from 'react-router-dom';
import apiClient from '../../data/api';
import numberSplitter from '../../utilities/numberSplitter';

function AdminRoomDetail() {
  const [switchState, setSwitchState] = useState({
    wifi: false,
    television: false,
    bed: false,
    ac: false,
    kitchen: false,
    computer: false,
    printer: false,
    projector: false,
  });
  const [visibleButton, setVisibleButton] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('0');

  const handleChangeSwitch = (event) => {
    setSwitchState({ ...switchState, [event.target.name]: event.target.checked });
    const objectIndex = Object.keys(switchState).indexOf(event.target.name) + 1;
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.put(`/api/facilities/${id}/${objectIndex}`, {
        isActive: event.target.checked ? 1 : 0,
      }).then((res) => {
        console.log(res);
      });
    });
  };

  const saveChange = () => {
    const newPrice = parseInt(price);
    console.log(newPrice);
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.put(`/api/room/update/${id}`, {
        newPrice,
      }).then((res) => {
        console.log(res);
      });
    });
    setVisibleButton('');
  };

  const changePrice = (e) => {
    setPrice(e.target.value);
    setVisibleButton('visible');
  };

  const { id } = useParams();

  useEffect(() => {
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.get(`/api/room/detail/${id}`).then((res) => {
        setTitle(res.data[0].room_name);
        setPrice(res.data[0].room_price);
      });
      apiClient.get(`/api/facilities/room/${id}`).then((res) => {
        setSwitchState({
          [res.data[0].facilities_title]: res.data[0].is_active === 1,
          [res.data[1].facilities_title]: res.data[1].is_active === 1,
          [res.data[2].facilities_title]: res.data[2].is_active === 1,
          [res.data[3].facilities_title]: res.data[3].is_active === 1,
          [res.data[4].facilities_title]: res.data[4].is_active === 1,
          [res.data[5].facilities_title]: res.data[5].is_active === 1,
          [res.data[6].facilities_title]: res.data[6].is_active === 1,
          [res.data[7].facilities_title]: res.data[7].is_active === 1,
        });
      });
    });
  }, []);

  return (
    <section id="adminRooms">
      <div className="rooms-section-container">
        <h2 className="rooms-section-title">{title}</h2>
        <div className="room-detail-container">
          <div className="price-container">
            <TextField
              label="Price"
              id="priceInput"
              className="price-input"
              value={price}
              onChange={changePrice}
              InputProps={{
                startAdornment: <InputAdornment position="start">Rp. </InputAdornment>,
                endAdornment: <InputAdornment position="end">/Night</InputAdornment>,
              }}
            />
            <Button
              color="primary"
              onClick={saveChange}
              className={`button-save ${visibleButton}`}
            >
              Save Price
            </Button>
          </div>
          <div className="row-facility">
            <div className="facility-container">
              <div className="facility-item">
                <div className="label-switch">
                  <WifiIcon />
                  <p className="label">Free Wifi</p>
                </div>
                <Switch
                  checked={switchState.wifi}
                  onChange={handleChangeSwitch}
                  name="wifi"
                  inputProps={{ 'aria-label': 'wifi switch' }}
                />
              </div>
              <div className="facility-item">
                <div className="label-switch">
                  <TvIcon />
                  <p className="label">Television</p>
                </div>
                <Switch
                  checked={switchState.television}
                  onChange={handleChangeSwitch}
                  name="television"
                  inputProps={{ 'aria-label': 'television switch' }}
                />
              </div>
              <div className="facility-item">
                <div className="label-switch">
                  <KingBedIcon />
                  <p className="label">Bed</p>
                </div>
                <Switch
                  checked={switchState.bed}
                  onChange={handleChangeSwitch}
                  name="bed"
                  inputProps={{ 'aria-label': 'bed switch' }}
                />
              </div>
              <div className="facility-item">
                <div className="label-switch">
                  <AcUnitIcon />
                  <p className="label">Air Conditioning</p>
                </div>
                <Switch
                  checked={switchState.ac}
                  onChange={handleChangeSwitch}
                  name="ac"
                  inputProps={{ 'aria-label': 'ac switch' }}
                />
              </div>
            </div>
            {/* ------- */}
            <div className="facility-container">
              <div className="facility-item">
                <div className="label-switch">
                  <KitchenIcon />
                  <p className="label">Kitchen</p>
                </div>
                <Switch
                  checked={switchState.kitchen}
                  onChange={handleChangeSwitch}
                  name="kitchen"
                  inputProps={{ 'aria-label': 'kitchen switch' }}
                />
              </div>
              <div className="facility-item">
                <div className="label-switch">
                  <DesktopWindowsIcon />
                  <p className="label">Computer</p>
                </div>
                <Switch
                  checked={switchState.computer}
                  onChange={handleChangeSwitch}
                  name="computer"
                  inputProps={{ 'aria-label': 'computer switch' }}
                />
              </div>
              <div className="facility-item">
                <div className="label-switch">
                  <PrintIcon />
                  <p className="label">Printer Unit</p>
                </div>
                <Switch
                  checked={switchState.printer}
                  onChange={handleChangeSwitch}
                  name="printer"
                  inputProps={{ 'aria-label': 'printer switch' }}
                />
              </div>
              <div className="facility-item">
                <div className="label-switch">
                  <VideocamIcon />
                  <p className="label">Projector Unit</p>
                </div>
                <Switch
                  checked={switchState.projector}
                  onChange={handleChangeSwitch}
                  name="projector"
                  inputProps={{ 'aria-label': 'projector switch' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminRoomDetail;
