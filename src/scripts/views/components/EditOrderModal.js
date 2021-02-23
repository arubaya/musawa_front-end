/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider, FormControl, Grid, InputLabel, MenuItem, Select,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import cartData from '../../data/CartData';
import numberSplitter from '../../utilities/numberSplitter';

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 992,
    flexDirection: 'column',
  },
  formControl: {
    width: '90%',
    marginTop: '10px',
  },
  buttonClose: {
    color: '#fff',
    borderColor: '#fff',
  },
}));

EditOrderModal.propTypes = {
  cart: PropTypes.object.isRequired,
};

function EditOrderModal({ cart }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const setCart = useSetRecoilState(cartData);
  const [price, setPrice] = useState(0);
  const [night, setNight] = useState(0);
  const [guest, setGuest] = useState(1);
  const [priceTotal, setPriceTotal] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  console.log(cart);

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
    setCart({
      total,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guest,
      night: day,
      roomName: cart.roomName,
      roomType: cart.roomType,
      price,
    });
    setIsAvailable(true);
  };

  useEffect(() => {
    setPrice(cart.price);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleChange = (event) => {
    setGuest(event.target.value);
  };

  return (
    <div>
      <button type="button" className="edit-order-button" onClick={handleToggle}>
        Edit order
      </button>
      <Backdrop className={classes.backdrop} open={open}>
        <div className="availability-check-container edit">
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
            <NavLink className="check-availability-button" to="/checkout" onClick={handleClose}>Book now</NavLink>
            :
            <button className="check-availability-button" type="button" onClick={onClickHandler}>Check Availability</button>}
        </div>
        <Button variant="outlined" onClick={handleClose} className={classes.buttonClose}>
          Close
        </Button>
      </Backdrop>
    </div>
  );
}

export default EditOrderModal;
