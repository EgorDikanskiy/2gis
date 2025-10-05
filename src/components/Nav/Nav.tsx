import React from "react";
import {
  useSearchParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import styles from "./Nav.module.scss";
import { routerUrls } from "config/routerUrls";
import logo from "assets/images/logo.png";

const Nav: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = searchParams.get("tab");

  React.useEffect(() => {
    if (!searchParams.get("tab")) {
      setSearchParams({ tab: "catalog" }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleTabChange = (tab: string) => {
    if (location.pathname !== routerUrls.root) {
      navigate(`${routerUrls.root}?tab=${tab}`, { replace: true });
    } else {
      setSearchParams({ tab }, { replace: true });
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link to="/">
          <div className={styles.logo}>
            <span className={styles.logoText}>
              <img src={logo}></img>
            </span>
          </div>
        </Link>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <button
              onClick={() => handleTabChange("catalog")}
              className={`${styles.menuLink} ${
                currentTab === "catalog" ? styles.active : ""
              }`}
            >
              Каталог
            </button>
          </li>
          <li className={styles.menuItem}>
            <button
              onClick={() => handleTabChange("map")}
              className={`${styles.menuLink} ${
                currentTab === "map" ? styles.active : ""
              }`}
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
