import kinderIcon from "assets/icons/kinder.svg";
import { BadgeType, type BadgeProps } from "components/Card/types";
import React from "react";

import { Text } from "components/Text/Text";
import styles from "./Badge.module.scss";

const Badge: React.FC<BadgeProps> = ({ ...BadgeProps }) => {
  return (
    <div className={styles.root}>
      <div className={styles.line}></div>
      <div className={styles.badge}>
        <img src={kinderIcon} width={20} height={20} alt="Kinder Icon" />
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
