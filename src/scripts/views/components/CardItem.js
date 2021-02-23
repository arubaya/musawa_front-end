import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function CardItem({ title, imageURL, link }) {
  const [linkTo, setLinkTo] = useState('');

  useEffect(() => {
    setLinkTo(`/room/${link}`);
  }, [link]);

  return (
    <NavLink className="card-item" to={linkTo}>
      <div className="card-image">
        <img src={imageURL} alt="Single room" />
      </div>
      <div className="card-title">
        <h4>{title}</h4>
      </div>
      {/* <div className="card-description">
          <p>{description}</p>
        </div>
        <div className="card-button">
          <button className="read-more-button" type="button">
            Read more
          </button>
        </div> */}
    </NavLink>
  );
}

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default CardItem;
