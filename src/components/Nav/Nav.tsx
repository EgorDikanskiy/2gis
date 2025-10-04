import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Nav.module.scss';

const Nav: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'catalog';
  
  React.useEffect(() => {
    if (!searchParams.get('tab')) {
      setSearchParams({ tab: 'catalog' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab }, { replace: true });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoText}>2GIS</span>
        </div>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <button 
              onClick={() => handleTabChange('catalog')}
              className={`${styles.menuLink} ${currentTab === 'catalog' ? styles.active : ''}`}
            >
              Каталог
            </button>
          </li>
          <li className={styles.menuItem}>
            <button 
              onClick={() => handleTabChange('map')}
              className={`${styles.menuLink} ${currentTab === 'map' ? styles.active : ''}`}
            >
              Интерактивная карта
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
