import React from 'react';
import type { CardProps } from './types';
import styles from './Card.module.scss';

const Card: React.FC<CardProps> = ({
  ...CardProps
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={CardProps.image} alt={CardProps.title} className={styles.image} />
        <div className={styles.index}>{CardProps.individualIndex}</div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{CardProps.title}</h3>
        <p className={styles.location}>{CardProps.address}</p>
        
        <div className={styles.rating}>
          <span className={styles.ratingValue}>{CardProps.rating}</span>
          <span className={styles.ratingStars}>★</span>
        </div>
        
        <div className={styles.badges}>
          {CardProps.infrastructure.map((badge, index) => (
            <span key={index} className={styles.badge}>
              {badge.type} ({badge.count})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
