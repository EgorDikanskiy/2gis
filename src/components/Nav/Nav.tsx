import React from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './Nav.module.scss';
import { routerUrls } from 'config/routerUrls';

const Nav: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = searchParams.get('tab');
  
  React.useEffect(() => {
    if (!searchParams.get('tab')) {
      setSearchParams({ tab: 'catalog' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleTabChange = (tab: string) => {
    // Если пользователь не на главной странице, редиректим на главную с выбранным табом
    if (location.pathname !== routerUrls.root) {
      navigate(`${routerUrls.root}?tab=${tab}`, { replace: true });
    } else {
      setSearchParams({ tab }, { replace: true });
    }
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
