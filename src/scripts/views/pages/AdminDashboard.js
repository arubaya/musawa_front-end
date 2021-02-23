/* eslint-disable max-len */
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from 'react';
import '../../../styles/adminDashboard.css';
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
    flexBasis: '25%',
    flexShrink: 0,
  },
  accordionDetail: {
    flexDirection: 'column',
  },
}));

function OrderItem({
  id, checkIn, checkOut, status, message, title, nameUser,
}) {
  const classes = useStyles();

  const rejectOrderhandle = () => {
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.put(`/api/order/update/${id}`, {
        status: 'Reject',
      }).then((res) => {
        console.log(res);
      });
    });
    console.log(`delete order id: ${id}`);
  };

  const acceptOrderhandle = () => {
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.put(`/api/order/update/${id}`, {
        status: 'Paid',
      }).then((res) => {
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
    <Accordion key={id} expanded={expanded === 'order-1'} onChange={handleChange('order-1')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>{nameUser}</Typography>
        <Typography className={classes.secondaryHeading}>{title}</Typography>
        <Typography className={classes.secondaryHeading}>{`${checkIn} - ${checkOut}`}</Typography>
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
        <Button variant="text" size="small" onClick={rejectOrderhandle}>Cancel</Button>
        <Button variant="text" size="small" color="primary" onClick={acceptOrderhandle}>
          Accept
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

OrderItem.propTypes = {
  id: PropTypes.number.isRequired,
  checkIn: PropTypes.string.isRequired,
  checkOut: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  nameUser: PropTypes.string.isRequired,
};

function AdminDashboard() {
  const [orderList, setOrderList] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.get('/api/order/all').then((res) => {
        setOrderList(res.data);
      });
    });
  }, []);
  return (
    <section id="adminDashboard">
      <div className="dashboard-container">
        <h2 className="dashboard-section-title">Order Dashboard</h2>
        <div className="order-ontainer">
          {orderList.map((order) => (
            <OrderItem
              id={order.id}
              checkIn={order.check_in}
              checkOut={order.check_out}
              status={order.status}
              title={order.room_name}
              message={order.message}
              nameUser={order.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
