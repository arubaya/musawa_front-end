import React from 'react';
import PropTypes from 'prop-types';

function CardItem({ title, imageURL, description }) {
  return (
    <div className="card-item">
      <h4 className="card-title">{title}</h4>
      <div className="card-image">
        <img src={imageURL} alt="Single room" />
      </div>
      <div className="card-description">
        <p>
          {description}
        </p>
      </div>
      <div className="card-button">
        <button className="read-more-button" type="button">Read more</button>
      </div>
    </div>
  );
}

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CardItem;
