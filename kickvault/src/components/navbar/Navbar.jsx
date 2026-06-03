
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import styles from './navbar.module.css';

export function Navbar() {

  const { NAV_CATEGORIES, NAV_MENU_ITEMS } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className={`${styles.header} fwBold`} >
        <div className={styles.titleContainer}  >
          <NavLink className={styles.titleLink} to="/">
            <span className={`${styles.title}`}
            >kickvault</span>
          </NavLink>
        </div>

        <button aria-controls="primary-mobile-menu" aria-expanded={isOpen} aria-label="menu"
          className={`${styles.menuContainer} ${isOpen ? styles.menuContainerActive : ''}`}
          onClick={toggleMenu}>
          <div className={styles.menuDesignTop} ></div>
          <div className={styles.menuDesignMiddle} ></div>
          <div className={styles.menuDesignBottom} ></div>
        </button>

      </header >

      <nav aria-label="Main Navigation"
        id="primary-mobile-menu"
        className={`${styles.navMenu} ${isOpen ? styles.navMenuActive : ''}`}>

        <div className={styles.navButtonContainer} >
          <button aria-controls="primary-mobile-menu" aria-expanded={isOpen} aria-label="menu"
            className={`${styles.menuContainer} ${isOpen ? styles.menuContainerActive : ''}`}
            onClick={toggleMenu}>
            <div className={styles.menuDesignTop} ></div>
            <div className={styles.menuDesignMiddle} ></div>
            <div className={styles.menuDesignBottom} ></div>
          </button>
        </div>

        <div className={styles.navUl} >
          <div className={styles.productCategoryContainer} >
            <ul className={styles.categoryUl}>

              {NAV_CATEGORIES.map(({ id, name, path }) => (
                <li key={id} className={styles.categoryLi}>
                  <NavLink className={styles.containerName} onClick={closeMenu}
                    to={path} >
                    <span className={styles.categoryName} >
                      {name}
                    </span>
                    {/* Hide visual arrow icon from screen readers to avoid audio clutter */}
                    <div aria-hidden="true" className={styles.arrowContainer}>
                      <span className={styles.arrowTop}></span>
                      <span className={styles.arrowBottom}></span>
                    </div>
                  </NavLink>
                </li>
              )
              )}

            </ul>
          </div>

          <ul className={styles.menuContainerList}>

            {NAV_MENU_ITEMS.map(({ id, name, path }) => (
              <li key={id} className={styles.menuLi} >
                <NavLink
                  className={({ isActive }) =>
                    `${styles.menuName} ${isActive ? styles.menuNameActive : ""} `}
                  onClick={closeMenu}
                  to={path}>
                  {name}
                </NavLink>
              </li>
            )
            )}

          </ul>

        </div>

      </nav>

    </>

  )
}