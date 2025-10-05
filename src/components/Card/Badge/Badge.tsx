import kinderIcon from "assets/icons/kinder.svg";
import { BadgeType, type BadgeProps } from "components/Card/types";
import React from "react";

import { Text } from "components/Text/Text";
import styles from "./Badge.module.scss";

// Функция для получения иконки по типу
const getIconForType = (_type: string) => {
  // Пока используем одну иконку для всех типов
  // В будущем можно добавить разные иконки для каждого типа
  return kinderIcon;
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
