import React from 'react';
import { Link } from 'react-router-dom';

export const PromoSection = ({ subtitle, title, description, image, productLink, reverse = false }) => {
  return (
    <section className={`promo-banner ${reverse ? 'reverse' : ''}`}>
      <div className={`promo-banner-content ${reverse ? 'reverse' : ''}`}>
        
        <div className="promo-image-col">
          <img
            src={image}
            alt={title}
            className="promo-img"
          />
        </div>

        <div className="promo-content">
          <p className="promo-subtitle">{subtitle}</p>
          <h2 className="promo-title">{title}</h2>
          <p className="promo-desc">{description}</p>
          <Link to={productLink} className="promo-link">
            KHÁM PHÁ
          </Link>
        </div>

      </div>
    </section>
  );
};