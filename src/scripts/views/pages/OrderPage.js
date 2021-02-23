import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails, AccordionSummary, Button, Divider, makeStyles, Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import Single from '../../../images/single-room.JPG';
import Double from '../../../images/double-room.JPG';
import Meet from '../../../images/meet-room.JPG';

import { getAllOrder, deleteOrder } from '../../data/IndexedDB';
import dateSpliter from '../../utilities/dateSplit';

import '../../../styles/orderPage.css';
import apiClient from '../../data/api';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500,
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '33,3%',
    flexShrink: 0,
  },
  accordionDetail: {
    flexDirection: 'column',
  },
  link: {
    textDecoration: 'none',
    color: '#445A80',
  },
}));

function OrderItem({
  id, checkIn, checkOut, status, message, title,
}) {
  const classes = useStyles();

  const deletehandle = () => {
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.delete(`/api/order/delete/${id}`).then((res) => {
        console.log(res);
      });
    });
    console.log(`delete order id: ${id}`);
  };

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Accordion key={id} expanded={expanded === `order${id}`} onChange={handleChange(`order${id}`)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>{title}</Typography>
        <Typography className={classes.secondaryHeading}>
          {`${checkIn} - ${checkOut}`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetail}>
        <div className="order-status-container">
          <p className="order-status-label">Status: </p>
          <p className="order-status">{status}</p>
        </div>
        <div className="message-container">
          <p className="message-label">Message:</p>
          <Typography>
            {message}
          </Typography>
        </div>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button variant="text" size="small" onClick={deletehandle}>Cancel</Button>
        <Button variant="text" size="small" color="primary">
          <NavLink className={classes.link} to={`/order/detail/${id}`}>
            Detail
          </NavLink>
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

OrderItem.propTypes = {
  id: PropTypes.number.isRequired,
  checkIn: PropTypes.instanceOf(Date).isRequired,
  checkOut: PropTypes.instanceOf(Date).isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

function OrderPage() {
  const [orderList, setOrderList] = useState([]);
  const [orderListStatus, setOrderListStatus] = useState(false);

  useEffect(() => {
    const Id = Cookies.get('id');
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.get(`/api/order/user/${Id}`).then((res) => {
        if (res.data.length === 0) {
          setOrderListStatus(false);
        } else {
          // setOrderList(res.data);
          setOrderList(res.data);
          setOrderListStatus(true);
        }
      });
    });
  }, [orderList]);

  return (
    <main>
      <section id="orderPage">
        <h2 className="page-title">My Orders</h2>
        <div className="order-list-container">
          {orderListStatus ? orderList.map((order) => (
            <OrderItem
              id={order.id}
              checkIn={order.check_in}
              checkOut={order.check_out}
              status={order.status}
              title={order.room_name}
              message={order.message}
            />
          )) : (
            <div className="no-order-container">
              <h3>No orders yet!</h3>
              <div className="link-container">
                <p>want to book?</p>
                <NavLink to="/booking">Book here</NavLink>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default OrderPage;
