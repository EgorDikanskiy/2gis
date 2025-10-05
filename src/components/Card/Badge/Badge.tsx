import kinderIcon from "assets/icons/kinder.svg";
import eduIcon from "assets/icons/edu.svg";
import medIcon from "assets/icons/med.svg";
import locationIcon from "assets/icons/location.svg";
import carsIcon from "assets/icons/cars.svg";
import { BadgeType, type BadgeProps } from "components/Card/types";
import React from "react";

import { Text } from "components/Text/Text";
import styles from "./Badge.module.scss";

// Функция для получения иконки по типу
const getIconForType = (type: string) => {
  switch (type) {
    case 'school':
      return eduIcon;
    case 'kindergarten':
      return kinderIcon;
    case 'clinic':
      return medIcon;
    case 'pharmacy':
      return medIcon;
    case 'park':
    case 'metro':
    case 'pickup_point':
      return locationIcon;
    case 'parking':
      return carsIcon;
    case 'shopping_mall':
    case 'grocery_store':
      return locationIcon; // Используем location как общую иконку для магазинов
    default:
      return locationIcon; // Иконка по умолчанию
  }
};

const Badge: React.FC<BadgeProps> = ({ ...BadgeProps }) => {
  return (
    <div className={styles.root}>
      <div className={styles.line}></div>
      <div className={styles.badge}>
        <img src={getIconForType(BadgeProps.type)} width={20} height={20} alt="Infrastructure Icon" />
        <Text tag="div" view="p-16" color="primary" weight="normal">
          {/* @ts-expect-error */}
          {BadgeType[BadgeProps.type]}:{" "}
          <Text tag="span" view="p-16" color="green" weight="normal">
            {BadgeProps.count}
          </Text>
        </Text>
      </div>
    </div>
  );
};

export default Badge;
