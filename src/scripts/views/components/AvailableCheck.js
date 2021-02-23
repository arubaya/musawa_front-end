import React from 'react';
import {
  Divider, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useSetRecoilState } from 'recoil';
import { NavLink } from 'react-router-dom';

import cartData from '../../data/CartData';

function AvailableCheck(props) {
  const [night, setNight] = useState(0);
  const [guest, setGuest] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [room, setRoom] = useState([]);

  const handleChange = (event) => {
    setGuest(event.target.value);
  };

  const setCart = useSetRecoilState(cartData);

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
      price,
      total: priceTotal,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guest,
      night,
    });
  }, [priceTotal]);

  return (
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
  );
}

export default AvailableCheck;
