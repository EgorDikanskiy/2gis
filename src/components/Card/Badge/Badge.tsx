import kinderIcon from "assets/icons/kinder.svg";
import eduIcon from "assets/icons/edu.svg";
import medIcon from "assets/icons/med.svg";
import pharmIcon from "assets/icons/pharm.svg";
import parkIcon from "assets/icons/parks.svg";
import metroIcon from "assets/icons/metro.svg";
import pickupIcon from "assets/icons/pickup.svg";
import locationIcon from "assets/icons/location.svg";
import parkingIcon from "assets/icons/parking.svg";
import mallIcon from "assets/icons/malls.svg";
import shopIcon from "assets/icons/shops.svg";
import { BadgeType, type BadgeProps } from "components/Card/types";
import React from "react";

import { Text } from "components/Text/Text";
import styles from "./Badge.module.scss";

const getIconForType = (type: string) => {
  switch (type) {
    case "school":
      return eduIcon;
    case "kindergarten":
      return kinderIcon;
    case "clinic":
      return medIcon;
    case "pharmacy":
      return pharmIcon;
    case "park":
      return parkIcon;
    case "metro":
      return metroIcon;
    case "pickup_point":
      return pickupIcon;
    case "parking":
      return parkingIcon;
    case "shopping_mall":
      return mallIcon;
    case "grocery_store":
      return shopIcon;
    default:
      return locationIcon;
  }
};

const Badge: React.FC<BadgeProps> = ({ ...BadgeProps }) => {
  return (
    <div className={styles.root}>
      <div className={styles.line}></div>
      <div className={styles.badge}>
        <img
          src={getIconForType(BadgeProps.type)}
          width={20}
          height={20}
          alt="Infrastructure Icon"
        />
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
