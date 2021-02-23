/* eslint-disable new-cap */
import React, { useEffect, useState } from 'react';
import {
  Divider, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select,
} from '@material-ui/core';
import { NavLink, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';

import WifiIcon from '@material-ui/icons/Wifi';
import TvIcon from '@material-ui/icons/Tv';
import KitchenIcon from '@material-ui/icons/Kitchen';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import KingBedIcon from '@material-ui/icons/KingBed';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import PrintIcon from '@material-ui/icons/Print';
import VideocamIcon from '@material-ui/icons/Videocam';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SmokeFreeIcon from '@material-ui/icons/SmokeFree';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useSetRecoilState } from 'recoil';

import Image1 from '../../../images/image-1.JPG';
import Image2 from '../../../images/image-2.JPG';
import Image3 from '../../../images/image-3.JPG';

import heroImage from '../../../images/hero-image.jpg';

import Single from '../../../images/single-room.JPG';
import Double from '../../../images/double-room.JPG';
import Meet from '../../../images/meet-room.JPG';

import '../../../styles/detailPage.css';
import numberSplitter from '../../utilities/numberSplitter';

import cartData from '../../data/CartData';

SwiperCore.use([Pagination]);

function DetailPage() {
  const [imageHeroDetail, setImageHeroDetail] = useState(heroImage);

  const setCart = useSetRecoilState(cartData);

  const [title, setTitle] = useState('');

  const [roomType, setRoomType] = useState('');
  const [price, setPrice] = useState(0);
  const [night, setNight] = useState(0);
  const [guest, setGuest] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());

  const handleInDateChange = (date) => {
    setCheckInDate(date);
    setIsAvailable(false);
  };
  const handleOutDateChange = (date) => {
    setCheckOutDate(date);
    setIsAvailable(false);
  };

  const dateCalculate = () => {
    const timeDifference = checkOutDate - checkInDate;
    const day = Math.round(timeDifference / (1000 * 3600 * 24));
    const total = Math.round(price * day);
    return [day, total];
  };

  const onClickHandler = () => {
    const [day, total] = dateCalculate();
    setPriceTotal(total);
    setNight(day);
    const element = document.querySelector('.availability-container');
    element.classList.add('active');
    setIsAvailable(true);
  };

  useEffect(() => {
    setCart({
      roomType,
      price,
      total: priceTotal,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guest,
      night,
    });
  }, [priceTotal]);

  const { id } = useParams();

  useEffect(() => {
    if (id === 'single') {
      setImageHeroDetail(Single);
      setTitle('Single Bed Room');
      setPrice(200000);
      setRoomType('single');
    } else if (id === 'double') {
      setImageHeroDetail(Double);
      setTitle('Double Bed Room');
      setPrice(200000);
      setRoomType('double');
    } else {
      setImageHeroDetail(Meet);
      setTitle('Meet Room');
      setPrice(200000);
      setRoomType('meet');
    }
  }, [id]);

  const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: '17px',
    },
    formControl: {
      width: '90%',
      marginTop: '10px',
    },
  }));

  const classes = useStyles();

  const handleChange = (event) => {
    setGuest(event.target.value);
  };

  return (
    <main>
      <section id="detailGallery">
        <div className="swiper-gallery">
          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
          >
            <SwiperSlide>
              <img className="image-gallery" src={imageHeroDetail} alt="jumbotron" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="image-gallery" src={Image2} alt="jumbotron" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="image-gallery" src={Image3} alt="jumbotron" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="grid-gallery">
          <Grid container spacing={1} className={classes.root}>
            <Grid item xs={7}>
              <img className="image-gallery" src={imageHeroDetail} alt="jumbotron" />
            </Grid>
            <Grid item xs={5}>
              <div className="grid-text-container">
                <h2>{title}</h2>
                <div className="line" />
                <p>{`Rp. ${numberSplitter(price)}/night`}</p>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={1} className={classes.root}>
            <Grid item xs={4}>
              <img className="image-gallery" src={Image1} alt="jumbotron" />
            </Grid>
            <Grid item xs={4}>
              <img className="image-gallery" src={Image2} alt="jumbotron" />
            </Grid>
            <Grid item xs={4}>
              <img className="image-gallery" src={Image3} alt="jumbotron" />
            </Grid>
          </Grid>
        </div>
      </section>

      <div className="detail-title">
        <h2>{title}</h2>
      </div>
      <Divider variant="middle" />
      <section id="dualLayout">
        <div className="left-side">
          <div id="detailFacility">
            <h4 className="detail-facility-title">Facilities</h4>
            <div className="detail-facility-container">
              <div className="row">
                <div className="col">
                  <div className="facility-item">
                    <WifiIcon />
                    <p>Free WIFI</p>
                  </div>
                  <div className="facility-item">
                    <TvIcon />
                    <p>Television</p>
                  </div>
                  <div className="facility-item">
                    <KingBedIcon />
                    <p>{title}</p>
                  </div>
                  <div className="facility-item">
                    <AcUnitIcon />
                    <p>Air Conditioning</p>
                  </div>
                </div>

                <div className="col">
                  <div className="facility-item">
                    <KitchenIcon />
                    <p>Kitchen</p>
                  </div>
                  <div className="facility-item">
                    <DesktopWindowsIcon />
                    <p>Dekstop computer</p>
                  </div>
                  <div className="facility-item">
                    <PrintIcon />
                    <p>Printer unit</p>
                  </div>
                  <div className="facility-item">
                    <VideocamIcon />
                    <p>Projector unit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider variant="middle" />
          <div id="detailFacility">
            <h4 className="detail-facility-title">House Rules</h4>
            <div className="detail-facility-container">
              <div className="row">
                <div className="col">
                  <div className="facility-item">
                    <ScheduleIcon />
                    <p>Check-in : 12.00 pm - 3.00 pm</p>
                  </div>
                  <div className="facility-item">
                    <SmokeFreeIcon />
                    <p>No smoking inside</p>
                  </div>
                  <div className="facility-item">
                    <NotInterestedIcon />
                    <p>No pets allowed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="availability-check-container">
            <p className="price-tag">{`Rp. ${numberSplitter(price)}/night`}</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-check-in"
                  label="check-in"
                  value={checkInDate}
                  inputVariant="outlined"
                  onChange={handleInDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-check-out"
                  label="check-out"
                  value={checkOutDate}
                  inputVariant="outlined"
                  onChange={handleOutDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Guest</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={guest}
                    onChange={handleChange}
                    label="Guest"
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

            </MuiPickersUtilsProvider>

            <div className="availability-container">
              <div className="availability-info">
                <p>Room is available</p>
              </div>
              <div className="price-detail-container">
                <div className="price-detail">
                  <p>{`Rp. ${numberSplitter(price)} x ${night} nights`}</p>
                  <p>{`Rp. ${numberSplitter(priceTotal)}`}</p>
                </div>
                <Divider variant="middle" />
                <div className="price-detail total">
                  <p>Total</p>
                  <p>{`Rp. ${numberSplitter(priceTotal)}`}</p>
                </div>
              </div>
            </div>
            {isAvailable ?
              <NavLink className="check-availability-button" to="/checkout">Book now</NavLink>
              :
              <button className="check-availability-button" type="button" onClick={onClickHandler}>Check Availability</button>}
          </div>
        </div>
      </section>

    </main>
  );
}

export default DetailPage;
