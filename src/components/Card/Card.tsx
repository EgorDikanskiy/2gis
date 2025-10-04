import locationIcon from "assets/icons/location.svg";
import image from "assets/images/mock-image.png";
import React from "react";
import type { CardProps } from "./types";
import { useNavigate } from "react-router-dom";
import { routerUrls } from "config/routerUrls";

import Badge from "components/Card/Badge/Badge";
import { Text } from "components/Text/Text";
import styles from "./Card.module.scss";

const Card: React.FC<CardProps> = ({ ...CardProps }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(routerUrls.detail.create(CardProps.id), { replace: true });
  };

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className={styles.imageContainer}>
        <img
          // src={CardProps.image}
          src={image}
          alt={CardProps.title}
          className={styles.image}
        />
      </div>

      <div className={styles.card__content}>
        <div className={styles["card__content-top"]}>
          <div>
            <Text
              className={styles.card__title}
              tag="div"
              view="p-20"
              color="primary"
              weight="medium"
            >
              {CardProps.title}
            </Text>
            <div className={styles.address}>
              <img src={locationIcon} alt="Location icon" />
              <Text tag="div" view="p-16" color="primary" weight="normal">
                {CardProps.address}
              </Text>
            </div>
          </div>

          <div className="">
            <Text tag="div" view="p-18" color="primary" weight="medium">
              Подходит вам
            </Text>
            <Text tag="div" view="p-18" color="primary" weight="medium">
              {"на "}
              <Text tag="span" view="p-18" color="green" weight="medium">
                9/10
              </Text>
            </Text>
          </div>
        </div>

        <div className={styles["card__badges"]}>
          {CardProps.infrastructure.map((badge, index) => {
            if (index < 4) {
              return (
                <Badge key={index} type={badge.type} count={badge.count} />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
