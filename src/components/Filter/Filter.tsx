import eduIcon from "assets/icons/edu.svg";
import kinderIcon from "assets/icons/kinder.svg";
import locationIcon from "assets/icons/location.svg";
import medIcon from "assets/icons/med.svg";
import carsIcon from "assets/icons/cars.svg";
import { Text } from "components/Text";
import React, { useState } from "react";
import styles from "./Filter.module.scss";

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
      icon: carsIcon,
    },
    {
      id: "park",
      label: "Парки",
      value: tempFilters.park,
      type: "park",
      icon: locationIcon,
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
      icon: locationIcon,
    },
    {
      id: "grocery_store",
      label: "Магазины",
      value: tempFilters.grocery_store,
      type: "grocery_store",
      icon: locationIcon,
    },
    {
      id: "shopping_mall",
      label: "Торговые центры",
      value: tempFilters.shopping_mall,
      type: "shopping_mall",
      icon: locationIcon,
    },
    {
      id: "pharmacy",
      label: "Аптеки",
      value: tempFilters.pharmacy,
      type: "pharmacy",
      icon: medIcon,
    },
    {
      id: "pickup_point",
      label: "Пункты выдачи",
      value: tempFilters.pickup_point,
      type: "pickup_point",
      icon: locationIcon,
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
      <Text className={styles.title} tag="div" color="accent">
        Укажите важность мест
      </Text>
      <Text className={styles.desc} color="secondary" view="p-14">
        Ранжируйте желаемые места по приоритетности
      </Text>

      <form className={styles.form}>
        {filterItems.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.item__header}>
              <img src={item.icon} alt="Location Icon" />
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
