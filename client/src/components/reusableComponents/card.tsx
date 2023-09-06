import React from 'react';

interface CardProps {
  title: string;
  imageSrc: string;
  body: string;
  onViewMoreClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, imageSrc, body, onViewMoreClick }) => {
  return (
    <div className="card-container">
      <div className="image-container">
        <img src={imageSrc} alt="" />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>{title}</h3>
        </div>
        <div className="card-body">
          <p>{body}</p>
        </div>
        <div className="btn"></div>
        <button onClick={onViewMoreClick}>
          <a className="view">View More</a>
        </button>
      </div>
    </div>
  );
};

export default Card;
