import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import CommuteIcon from '@material-ui/icons/Commute';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import LockIcon from '@material-ui/icons/Lock';

// Import Style
import '../../../styles/home.css';

import Single from '../../../images/single-room.JPG';
import Double from '../../../images/double-room.JPG';
import Meet from '../../../images/meet-room.JPG';

import Image1 from '../../../images/image-1.JPG';
import Image2 from '../../../images/image-2.JPG';
import Image3 from '../../../images/image-3.JPG';
import Image4 from '../../../images/image-4.JPG';
import Image5 from '../../../images/image-5.JPG';
import Image6 from '../../../images/image-6.JPG';

import heroImage from '../../../images/hero-image.jpg';

import scrollTo from '../../utilities/scrollTo';

import CardItem from '../components/CardItem';

const useStyles = makeStyles({
  jumbotronHome: {
    backgroundImage: `url(${heroImage})`,
  },
});

function Home() {
  const classes = useStyles();
  return (
    <main>
      <section id="jumbotron" className={classes.jumbotronHome}>
        <div className="color-filter">
          <div className="text-container">
            <div className="line-container">
              <div className="line-1" />
              <div className="line-2" />
            </div>
            <h3>MAKE YOURSELF</h3>
            <h3>AT HOME</h3>
            <button
              className="read-more-button"
              type="button"
              onClick={() => scrollTo('description')}
            >
              Read more
            </button>
          </div>
        </div>
      </section>

      <section id="description">
        <div className="text-container">
          <h3>Simple and Comfortable</h3>
          <p>
            Homestay musawa is a simple, affordable and comfortable place to stay.
            The place is very strategic to many amusement at Yogyakarta.
          </p>
        </div>
        <div className="button-container">
          <NavLink className="book-button" to="/booking">Book now</NavLink>
        </div>
      </section>

      <section id="rooms">
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

      <section id="services">
        <h4 className="services-section-title">Our services</h4>
        <div className="services-container">
          <div className="row">
            <div className="col">

              <div className="service-item">
                <AccessibilityNewIcon />
                <p>Many Fasilities</p>
              </div>

              <div className="service-item">
                <CommuteIcon />
                <p>Strategic Place</p>
              </div>
            </div>

            <div className="col">

              <div className="service-item">
                <LoyaltyIcon />
                <p>Very Affordable</p>
              </div>

              <div className="service-item">
                <LockIcon />
                <p>Well Secured</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery">
        <h4 className="gallery-section-title">Gallery</h4>
        <div className="gallery-container">
          <div className="row-container">
            <div className="column">
              <img src={Image1} alt="1" />
              <img src={Image2} alt="1" />
            </div>
            <div className="column">
              <img src={Image3} alt="1" />
              <img src={Image4} alt="1" />
            </div>
            <div className="column">
              <img src={Image5} alt="1" />
              <img src={Image6} alt="1" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
