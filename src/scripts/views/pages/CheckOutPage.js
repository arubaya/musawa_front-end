import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import cartData from '../../data/CartData';
import dateSpliter from '../../utilities/dateSplit';

import Single from '../../../images/single-room.JPG';
import Double from '../../../images/double-room.JPG';
import Meet from '../../../images/meet-room.JPG';

import '../../../styles/checkoutPage.css';
import numberSplitter from '../../utilities/numberSplitter';

import { addOrder } from '../../data/IndexedDB';
import EditOrderModal from '../components/EditOrderModal';
import apiClient from '../../data/api';

function CheckOutPage() {
  const cart = useRecoilState(cartData);
  const [totalPrice, setTotalPrice] = useState(0);
  const [roomImage, setRoomImage] = useState(null);
  const [messageValue, setMessageValue] = useState('');
  const feePrice = 5000;
  const history = useHistory();

  const [price, setPrice] = useState(cart[0].price);

  useEffect(() => {
    setTotalPrice(cart[0].total + feePrice);
  }, [cart[0].roomType]);

  useEffect(() => {
    console.log(cart[0]);
    if (cart[0].roomType === 'single') {
      setRoomImage(Single);
    } else if (cart[0].roomType === 'double') {
      setRoomImage(Double);
    } else {
      setRoomImage(Meet);
    }
  }, [cart[0].roomType]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.post('/api/order/add', {
        roomId: cart[0].roomId,
        userId: cart[0].userId,
        guests: cart[0].guest,
        checkIn: cart[0].checkIn,
        checkOut: cart[0].checkOut,
        totalDays: cart[0].night,
        message: messageValue,
        status: 'waiting',
      }).then((res) => {
        console.log(res);
        setOpen(true);
      });
    });
    // getAllOrder().then((res) => console.log(res[0].id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const redirectToOrder = () => {
    setOpen(false);
    history.push('/order');
  };

  const messageHandleChange = (e) => {
    setMessageValue(e.target.value);
  };

  return (
    <main>
      <div className="checkout-title-container">
        <button className="back-button" type="button" onClick={() => history.goBack()}>
          <ArrowBackIosIcon />
        </button>
        <h2 className="checkout-title">Confirm and pay</h2>
      </div>
      <div className="dual-layout">
        <section id="tripDetail">
          <div className="trip-detail-container">
            <h4>Your trip</h4>
            <div className="date-container">
              <h5 className="title-text">Dates</h5>
              <p className="content-text">{`${dateSpliter(cart[0].checkInDate)} - ${dateSpliter(cart[0].checkOutDate)}`}</p>
            </div>
            <div className="guest-container">
              <h5 className="title-text">Guest</h5>
              <p className="content-text">{`${cart[0].guest} guest`}</p>
            </div>
            <EditOrderModal cart={cart[0]} />
            <Divider variant="middle" />
            <div className="message-container">
              <h5>Required for your trip</h5>
              <h6>Message the host</h6>
              <p>Let the host know why you’re travelling and when you’ll check in</p>
              <TextField
                id="outlined-multiline-static"
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                value={messageValue}
                onChange={messageHandleChange}
              />
              <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Confirm and pay
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Your Booked Request has been Succesful</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    You can track your booked request in Order page
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={redirectToOrder} color="primary" autoFocus>
                    My order
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </section>
        <section id="priceDetail">
          <div className="price-detail-container">
            <div className="room-type-container">
              <img src={roomImage} alt="single bed" />
              <div className="text-container">
                <h6>{`${cart[0].roomName} in homestay musawa`}</h6>
                <p>Simple and Comfortable</p>
              </div>
            </div>
            <Divider variant="middle" />
            <div className="price-container">
              <h5>Price details</h5>
              <div className="price-list">
                <p>{`Rp. ${numberSplitter(price)} x ${cart[0].night} nights`}</p>
                <p>{`Rp. ${numberSplitter(cart[0].total)}`}</p>
              </div>
              <div className="price-list">
                <p>Service fee</p>
                <p>{`Rp. ${numberSplitter(feePrice)}`}</p>
              </div>
              <div className="price-list total">
                <p>Total</p>
                <p>{`Rp. ${numberSplitter(totalPrice)}`}</p>
              </div>
            </div>
            <Divider variant="middle" />
            <div className="cancel-text-container">
              <p>Free cancellation until 2:00 pm</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CheckOutPage;
