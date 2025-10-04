import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.scss';
import { routerUrls } from '../../config/routerUrls';

const Nav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoText}>2GIS</span>
        </div>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Link 
              to={routerUrls.root} 
              className={`${styles.menuLink} ${location.pathname === routerUrls.root ? styles.active : ''}`}
            >
              Каталог
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link 
              to={routerUrls.map} 
              className={`${styles.menuLink} ${location.pathname === routerUrls.map ? styles.active : ''}`}
            >
              Интерактивная карта
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
