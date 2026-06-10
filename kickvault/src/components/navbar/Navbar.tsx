
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import styles from './navbar.module.css';


export function Navbar() {

  const { categoryLinks, primaryLinks } = useShop();
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
      <div className={`${styles.headerViewport}`} >
        <div className={styles.brandContainer}  >
          <NavLink className={styles.brandLink} to="/">
            <span className={`${styles.brandTitle}`}
            >kickvault</span>
          </NavLink>
        </div>

        {!isOpen && (
          <button
            aria-controls="primary-mobile-menu"
            aria-expanded={isOpen}
            aria-label="Open menu"
            className={styles.navigationToggle}
            onClick={toggleMenu} >

            <div className={styles.burgerLineTop} ></div>
            <div className={styles.burgerLineMiddle} ></div>
            <div className={styles.burgerLineBottom} ></div>
          </button>
        )}

      </div >

      <dialog
        aria-label="Main Navigation"
        id="primary-mobile-menu"
        ref={dialogRef}
        className={styles.navigationMenu} >

        <div className={styles.toggleViewport} >
          {isOpen && (
            <button
              aria-controls="primary-mobile-menu"
              aria-expanded={isOpen}
              aria-label="menu"
              className={`${styles.navigationToggle} 
              ${isOpen ? styles.navigationToggleActive : ''}`}
              onClick={toggleMenu} >

              <div className={styles.burgerLineTop} ></div>
              <div className={styles.burgerLineMiddle} ></div>
              <div className={styles.burgerLineBottom} ></div>
            </button>
          )}
        </div>

        <div className={styles.navigationGroup} >
          <div className={styles.categoryViewPort} >
            <ul className={styles.categoryMenu}>

              {categoryLinks.map(({ id, name, path }) => (
                <li key={id} className={styles.categoryItem}>
                  <NavLink
                    className={({ isActive }) => `${styles.categoryLink}
                   ${isActive ? styles.categoryLinkActive : ""}`}
                    onClick={closeMenu}
                    to={path} >
                    <span className={styles.categoryLabel} >
                      {name}
                    </span>
                  </NavLink>
                </li>
              )
              )}

            </ul>
          </div>

          <ul className={styles.utilityMenu}>

            {primaryLinks.map(({ id, name, path }) => (
              <li key={id} className={styles.utilityItem} >
                <NavLink
                  className={({ isActive }) =>
                    `${styles.utilityLink} ${isActive ? styles.utilityLinkActive : ""} `}
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