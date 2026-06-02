
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_CATEGORIES, NAV_MENU_ITEMS } from '../../data/navData';

import styles from './navbar.module.css';

export function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={styles.navbar} >

      <div className={styles.titleContainer}  >
        <NavLink to="/">
          <span className={`${styles.title} titleWeight`}
          >kickvault</span>
        </NavLink>
      </div>

      <button aria-controls={styles.mobileMenu} aria-expanded={isOpen} aria-label="menu"
        className={`${styles.menuContainer} ${isOpen ? styles.menuContainerActive : ''}`}
        onClick={toggleMenu}>
        <div className={styles.menuDesignTop} ></div>
        <div className={styles.menuDesignMiddle} ></div>
        <div className={styles.menuDesignBottom} ></div>
      </button>

      <nav aria-label="Main Navigation" id="mobile-menu"
        className={`${styles.navMenu} ${isOpen ? styles.navMenuActive : ''}`}>

        <div className={styles.titleContainerNav} >
          <NavLink to="/">
            <span onClick={closeMenu}
              className={` ${styles.titleNav }      titleWeight`}>kickvault</span>
          </NavLink>
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
                      <div aria-hidden="true"
                        className={styles.arrowContainer} >
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
                <NavLink className={styles.menuName} onClick={closeMenu}
                  to={path}>
                    {name}
                </NavLink>
              </li>
            )
            )}

          </ul>

        </div>

      </nav>

    </header >
  )
}