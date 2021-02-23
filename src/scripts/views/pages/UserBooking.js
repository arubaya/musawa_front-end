import React from 'react';
import { makeStyles } from '@material-ui/core';

import Single from '../../../images/single-room.JPG';
import Double from '../../../images/double-room.JPG';
import Meet from '../../../images/meet-room.JPG';

import CardItem from '../components/CardItem';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '50px',
  },
}));

function UserBooking() {
  const classes = useStyles();
  return (
    <main>
      <section id="rooms" className={classes.root}>
        <h4 className="rooms-section-title">Rooms</h4>
        <div className="card-container">
          <div className="row-container">
            <div className="column">
              <CardItem
                title="Single bed room"
                imageURL={Single}
                link="1"
              />
            </div>
            <div className="column">
              <CardItem
                title="Double bed room"
                imageURL={Double}
                link="2"
              />
            </div>
            <div className="column">
              <CardItem
                title="Meeting room"
                imageURL={Meet}
                link="3"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default UserBooking;
