import React, { useState } from 'react';
import styles from './Filter.module.scss';

interface FilterItem {
  id: string;
  label: string;
  value: number;
  type: string;
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
    pickup_point: 5
  });

  const [tempFilters, setTempFilters] = useState<Record<string, number>>(filters);

  const filterItems: FilterItem[] = [
    { id: 'school', label: 'Школы', value: tempFilters.school, type: 'school' },
    { id: 'kindergarten', label: 'Детские сады', value: tempFilters.kindergarten, type: 'kindergarten' },
    { id: 'parking', label: 'Парковки', value: tempFilters.parking, type: 'parking' },
    { id: 'park', label: 'Парки', value: tempFilters.park, type: 'park' },
    { id: 'clinic', label: 'Клиники', value: tempFilters.clinic, type: 'clinic' },
  ];

  const handleFilterChange = (id: string, value: number) => {
    const newTempFilters = { ...tempFilters, [id]: value };
    setTempFilters(newTempFilters);
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    
    const filterData: FilterData = {
      filters: filterItems.map(item => ({
        type: item.type,
        priority: tempFilters[item.id]
      }))
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
    };
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
    
    const filterData: FilterData = {
      filters: filterItems.map(item => ({
        type: item.type,
        priority: defaultFilters[item.id]
      }))
    };
    
    onFilterChange?.(filterData);
  };

  return (
    <div className={styles.filter}>
      <h2 className={styles.title}>Выбери важность</h2>
      
      <form className={styles.form}>
        {filterItems.map((item) => (
          <div key={item.id} className={styles.filterItem}>
            <label htmlFor={item.id} className={styles.label}>
              {item.label}
            </label>
            <div className={styles.rangeContainer}>
              <input
                type="range"
                id={item.id}
                min="1"
                max="10"
                value={item.value}
                onChange={(e) => handleFilterChange(item.id, parseInt(e.target.value))}
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
