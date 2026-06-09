
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import styles from './navbar.module.css';


export function Navbar() {

  const { NAV_CATEGORIES, NAV_MENU_ITEMS } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isOpen) {
      document.body.classList.add('bodyScrollLocked');
      dialogElement.showModal();
    } else {
      document.body.classList.remove('bodyScrollLocked')
      dialogElement.close();
    }
    return () => {
      document.body.classList.remove('bodyScrollLocked');
    }
  }, [isOpen])

  return (
    <header className={styles.headerContainer}>
      <div className={`${styles.header}`} >
        <div className={styles.titleContainer}  >
          <NavLink className={styles.titleLink} to="/">
            <span className={`${styles.title}`}
            >kickvault</span>
          </NavLink>
        </div>

        {!isOpen && (
          <button
            aria-controls="primary-mobile-menu" aria-expanded={isOpen}
            aria-label="Open menu"
            className={styles.menuContainer}
            onClick={toggleMenu} >

            <div className={styles.menuDesignTop} ></div>
            <div className={styles.menuDesignMiddle} ></div>
            <div className={styles.menuDesignBottom} ></div>
          </button>
        )}

      </div >

      <dialog
        aria-label="Main Navigation"
        id="primary-mobile-menu"
        ref={dialogRef}
        className={styles.navMenu} >

        <div className={styles.navButtonContainer} >
          {isOpen && (
            <button
              aria-controls="primary-mobile-menu" aria-expanded={isOpen}
              aria-label="menu"
              className={`${styles.menuContainer} ${isOpen ?
                styles.menuContainerActive : ''}`}
              onClick={toggleMenu} >

              <div className={styles.menuDesignTop} ></div>
              <div className={styles.menuDesignMiddle} ></div>
              <div className={styles.menuDesignBottom} ></div>
            </button>
          )}
        </div>

        <div className={styles.navUl} >
          <div className={styles.productCategoryContainer} >
            <ul className={styles.categoryUl}>

              {NAV_CATEGORIES.map(({ id, name, path }) => (
                <li key={id} className={styles.categoryLi}>
                  <NavLink
                    className={({ isActive }) => `${styles.containerName}
                   ${isActive ? styles.containerNameActive : ""}`}
                    onClick={closeMenu}
                    to={path} >
                    <span className={styles.categoryName} >
                      {name}
                    </span>
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

      </dialog>

    </header>

  )
}