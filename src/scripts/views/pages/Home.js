import React from 'react';

import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import CommuteIcon from '@material-ui/icons/Commute';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import LockIcon from '@material-ui/icons/Lock';

import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';
import InstagramIcon from '@material-ui/icons/Instagram';
import StreetviewIcon from '@material-ui/icons/Streetview';

import Single from '../../../images/single-room.JPG';
import Double from '../../../images/double-room.JPG';
import Meet from '../../../images/meet-room.JPG';

import Image1 from '../../../images/image-1.JPG';
import Image2 from '../../../images/image-2.JPG';
import Image3 from '../../../images/image-3.JPG';
import Image4 from '../../../images/image-4.JPG';
import Image5 from '../../../images/image-5.JPG';
import Image6 from '../../../images/image-6.JPG';

import scrollTo from '../../utilities/scrollTo';

import CardItem from '../components/CardItem';

function Home() {
  return (
    <main>
      <section id="jumbotronHome">
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
          <button className="book-button" type="button">Book Now</button>
        </div>
      </section>

      <section id="facility">
        <div className="card-container">
          <CardItem
            title="Single room"
            imageURL={Single}
            description="Single Type consist of 1 queen size bedroom, an air
            conditioner, a television, a wardrobe and a desk"
          />
          <CardItem
            title="Double room"
            imageURL={Double}
            description="Double Type consist of 2 single size bedroom, an air
            conditioner, a television, a wardrobe and a desk"
          />
          <CardItem
            title="Meeting room"
            imageURL={Meet}
            description="Meeting Type consist of meeting chair and desk , an air
            conditioner, a proyector, a computer and a printer"
          />
        </div>
      </section>

      <section id="services">
        <h4 className="services-section-title">Our services</h4>
        <div className="services-container">
          <div className="row">
            <div className="col">

              <div className="service-item">
                <AccessibilityNewIcon />
                <p>
                  We have
                  <b> many fasilities </b>
                  that will make your stay more homy and comfortable
                </p>
              </div>

              <div className="service-item">
                <CommuteIcon />
                <p>
                  The
                  <b> place is very strategic </b>
                  to traditional market, zoo, mall and other famous places
                </p>
              </div>
            </div>

            <div className="col">

              <div className="service-item">
                <LoyaltyIcon />
                <p>
                  The place is
                  <b> very affordable </b>
                  and not overpriced it will worth every payment that you will make
                </p>
              </div>

              <div className="service-item">
                <LockIcon />
                <p>
                  The place is
                  <b> well secured</b>
                  , because we have locks and camera surrounding the house/ homestay
                </p>
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

      <section id="contact">
        <h4 className="contact-section-title">Contact</h4>
        <div className="contact-container">
          <div className="contact-item">
            <CallIcon />
            <p>Phone :</p>
            <p>0896-1919-9564</p>
          </div>

          <div className="contact-item">
            <MailIcon />
            <p>Email :</p>
            <p>fahrymuh691@gmail.com</p>
          </div>

          <div className="contact-item">
            <InstagramIcon />
            <p>Instagram :</p>
            <p>@homestaymusawa</p>
          </div>

          <div className="contact-item">
            <StreetviewIcon />
            <p>Address :</p>
            <p>Jl. Sawo 01 no.463 Wonocatur, Banguntapan, Bantul, Yogyakarta</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
