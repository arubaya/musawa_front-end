import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField,
} from '@material-ui/core';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import cartData from '../../data/CartData';
import dateSpliter from '../../utilities/dateSplit';

import Single from '../../../images/single-room.JPG';
import Double from '../../../images/double-room.JPG';
import Meet from '../../../images/meet-room.JPG';

import '../../../styles/checkoutPage.css';
import numberSplitter from '../../utilities/numberSplitter';

import apiClient from '../../data/api';

function OrderDetailPage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [roomImage, setRoomImage] = useState(null);
  // const [messageValue, setMessageValue] = useState('');
  const [orderData, setOrderData] = useState({
    checkInDate: '',
    checkOutDate: '',
    guest: 0,
    messageValue: '',
    roomName: '',
    price: 0,
    night: 0,
  });
  const feePrice = 5000;
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.get(`/api/order/detail/${id}`).then((res) => {
        console.log(res);
        if (res.data.room_id === 1) {
          setRoomImage(Single);
        } else if (res.data.room_id === 2) {
          setRoomImage(Double);
        } else {
          setRoomImage(Meet);
        }
        setTotal(res.data.room_price * res.data.total_days);
        setTotalPrice(feePrice + (res.data.room_price * res.data.total_days));
        setOrderData({
          checkInDate: res.data.check_in,
          checkOutDate: res.data.check_out,
          guest: res.data.guests,
          messageValue: res.data.message,
          roomName: res.data.room_name,
          price: res.data.room_price,
          night: res.data.total_days,
        });
      }).catch(() => (<Redirect to="/order" />));
    });
  }, []);

  return (
    <main>
      <div className="checkout-title-container">
        <button className="back-button" type="button" onClick={() => history.goBack()}>
          <ArrowBackIosIcon />
        </button>
        <h2 className="checkout-title">Order Detail</h2>
      </div>
      <div className="dual-layout">
        <section id="tripDetail">
          <div className="trip-detail-container">
            <h4>Your trip</h4>
            <div className="date-container">
              <h5 className="title-text">Dates</h5>
              <p className="content-text">{`${orderData.checkInDate} - ${orderData.checkOutDate}`}</p>
            </div>
            <div className="guest-container">
              <h5 className="title-text">Guest</h5>
              <p className="content-text">{`${orderData.guest} guest`}</p>
            </div>
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
                value={orderData.messageValue}
              />
            </div>
          </div>
        </section>
        <section id="priceDetail">
          <div className="price-detail-container">
            <div className="room-type-container">
              <img src={roomImage} alt="single bed" />
              <div className="text-container">
                <h6>{`${orderData.roomName} in homestay musawa`}</h6>
                <p>Simple and Comfortable</p>
              </div>
            </div>
            <Divider variant="middle" />
            <div className="price-container">
              <h5>Price details</h5>
              <div className="price-list">
                <p>{`Rp. ${numberSplitter(orderData.price)} x ${orderData.night} nights`}</p>
                <p>{`Rp. ${numberSplitter(total)}`}</p>
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

export default OrderDetailPage;
