import React from 'react';
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';
import InstagramIcon from '@material-ui/icons/Instagram';
import StreetviewIcon from '@material-ui/icons/Streetview';

import '../../../styles/footer.css';
import colorLogo from '../../../images/color-logo.png';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-logo-container">
        <img className="footer-logo" src={colorLogo} alt="Musawa Logo" />
        <p className="copyright-text">Copyright &copy; 2020 Homestay Musawa</p>
      </div>
      <div id="contact">
        <h4 className="contact-section-title">Contact</h4>
        <div className="contact-container">
          <div className="contact-item">
            <CallIcon />
            <div className="text-container">
              <p>Phone :</p>
              <p>0896-1919-9564</p>
            </div>
          </div>

          <div className="contact-item">
            <MailIcon />
            <div className="text-container">
              <p>Email :</p>
              <p>fahrymuh691@gmail.com</p>
            </div>
          </div>

          <div className="contact-item">
            <InstagramIcon />
            <div className="text-container">
              <p>Instagram :</p>
              <p>@homestaymusawa</p>
            </div>
          </div>

          <div className="contact-item">
            <StreetviewIcon />
            <div className="text-container">
              <p>Address :</p>
              <p>Jl. Sawo 01 no.463 Wonocatur, Banguntapan, Bantul, Yogyakarta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
