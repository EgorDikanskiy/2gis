import eduIcon from "assets/icons/edu.svg";
import medIcon from "assets/icons/med.svg";
import { Text } from "components/Text";
import React, { useState } from "react";
import styles from "./Filter.module.scss";

import kinderIcon from "assets/icons/kinder.svg";
import mallIcon from "assets/icons/malls.svg";
import metroIcon from "assets/icons/metro.svg";
import parkingIcon from "assets/icons/parking.svg";
import parkIcon from "assets/icons/parks.svg";
import pharmIcon from "assets/icons/pharm.svg";
import pickupIcon from "assets/icons/pickup.svg";
import shopIcon from "assets/icons/shops.svg";

interface FilterItem {
  id: string;
  label: string;
  value: number;
  type: string;
  icon: string;
}

interface FilterData {
  filters: Array<{
    type: string;
    priority: number;
  }>;
}

interface FilterProps {
  onFilterChange?: (filters: FilterData) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Record<string, number>>({
    school: 5,
    kindergarten: 5,
    parking: 5,
    park: 5,
    clinic: 5,
    metro: 5,
    grocery_store: 5,
    shopping_mall: 5,
    pharmacy: 5,
    pickup_point: 5,
  });

  const [tempFilters, setTempFilters] =
    useState<Record<string, number>>(filters);

  const filterItems: FilterItem[] = [
    {
      id: "school",
      label: "Школы",
      value: tempFilters.school,
      type: "school",
      icon: eduIcon,
    },
    {
      id: "kindergarten",
      label: "Детские сады",
      value: tempFilters.kindergarten,
      type: "kindergarten",
      icon: kinderIcon,
    },
    {
      id: "parking",
      label: "Парковки",
      value: tempFilters.parking,
      type: "parking",
      icon: parkingIcon,
    },
    {
      id: "park",
      label: "Парки",
      value: tempFilters.park,
      type: "park",
      icon: parkIcon,
    },
    {
      id: "clinic",
      label: "Клиники",
      value: tempFilters.clinic,
      type: "clinic",
      icon: medIcon,
    },
    {
      id: "metro",
      label: "Метро",
      value: tempFilters.metro,
      type: "metro",
      icon: metroIcon,
    },
    {
      id: "grocery_store",
      label: "Магазины",
      value: tempFilters.grocery_store,
      type: "grocery_store",
      icon: shopIcon,
    },
    {
      id: "shopping_mall",
      label: "Торговые центры",
      value: tempFilters.shopping_mall,
      type: "shopping_mall",
      icon: mallIcon,
    },
    {
      id: "pharmacy",
      label: "Аптеки",
      value: tempFilters.pharmacy,
      type: "pharmacy",
      icon: pharmIcon,
    },
    {
      id: "pickup_point",
      label: "Пункты выдачи",
      value: tempFilters.pickup_point,
      type: "pickup_point",
      icon: pickupIcon,
    },
  ];

  const handleFilterChange = (id: string, value: number) => {
    const newTempFilters = { ...tempFilters, [id]: value };
    setTempFilters(newTempFilters);
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters);

    const filterData: FilterData = {
      filters: filterItems.map((item) => ({
        type: item.type,
        priority: tempFilters[item.id],
      })),
    };

    onFilterChange?.(filterData);
  };

  const handleResetFilters = () => {
    const defaultFilters: Record<string, number> = {
      school: 5,
      kindergarten: 5,
      parking: 5,
      park: 5,
      clinic: 5,
      metro: 5,
      grocery_store: 5,
      shopping_mall: 5,
      pharmacy: 5,
      pickup_point: 5,
    };
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);

    const filterData: FilterData = {
      filters: filterItems.map((item) => ({
        type: item.type,
        priority: defaultFilters[item.id],
      })),
    };

    onFilterChange?.(filterData);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.title}>
        <Text tag="div" color="accent">
          Укажите важность мест
        </Text>
        <Text tag="div" color="secondary" view="p-14">
          Ранжируйте желаемые места по приоритетности
        </Text>
      </div>

      <form className={styles.form}>
        <div className={styles.items__container}>
          {filterItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.item__header}>
                <img
                  src={item.icon}
                  alt="Location Icon"
                  width={26}
                  height={26}
                />
                <Text view="p-20" weight="medium">
                  {item.label}
                </Text>
              </div>
              <div className={styles.rangeContainer}>
                <input
                  type="range"
                  id={item.id}
                  min="1"
                  max="10"
                  value={item.value}
                  onChange={(e) =>
                    handleFilterChange(item.id, parseInt(e.target.value))
                  }
                  className={styles.rangeInput}
                />
                <span className={styles.value}>{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buttonContainer}>
          <button
            type="button"
            onClick={handleApplyFilters}
            className={styles.applyButton}
          >
            Применить фильтры
          </button>
          <button
            type="button"
            onClick={handleResetFilters}
            className={styles.resetButton}
          >
            Сбросить
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
