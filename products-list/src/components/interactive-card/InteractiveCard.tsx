import React from 'react';
import './InteractiveCard.css';

interface InteractiveCardProps {
  name: string;
  price: string;
  description: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ name, price, description }) => {
  return (
    <div className="interactive-card">
      <h2 className="card-title">{name}</h2>
      <p className="card-price">{price}</p>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default InteractiveCard;
