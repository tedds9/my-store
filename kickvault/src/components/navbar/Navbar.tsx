
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import styles from './navbar.module.css';


export function Navbar() {

  const { categoryLinks, primaryLinks } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className={styles.navigationContext}>
      <div className={`${styles.navigationViewport}`} >
        <NavLink className={styles.brandLink} to="/" onClick={closeMenu} >
          <span className={`${styles.brandTitle}`}
          >kickvault</span>
        </NavLink>

        <button
          type="button"
          aria-controls="primary-navigation-overlay"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className={styles.navigationAction}
          data-state={isOpen ? "active" : "idle"}
          onClick={toggleMenu}
        >
          <span className={styles.actionIcon} aria-hidden="true" />
        </button>


        <div
          id="primary-navigation-overlay"
          className={styles.navigationOverlay}
          data-state={isOpen ? "active" : "idle"}
        >
          <div className={styles.overlayPanel} >
            <nav className={styles.categoryCluster} aria-label="Categories" >
              {categoryLinks.map(({ id, name, path }) => (
                <NavLink
                  key={id}
                  className={styles.categoryAction}
                  onClick={closeMenu}
                  to={path}
                >
                  {({ isActive }: { isActive: boolean }) =>
                  (<span className={styles.categoryLabel}
                    data-state={isActive ? "active" : "idle"}
                  >
                    {name}
                  </span>)}
                </NavLink>
              ))}
            </nav>

            <nav className={styles.utilityCluster} aria-label="Utilities" >
              {primaryLinks.map(({ id, name, path }) => (
                <NavLink
                  key={id}
                  className={styles.utilityAction}
                  onClick={closeMenu}
                  to={path}
                >
                  {({ isActive }: { isActive: boolean }) =>
                  (<span
                    className={styles.utilityLabel}
                    data-state={isActive ? "active" : "idle"}
                  >
                    {name}
                  </span>)
                  }
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div >

    </header>

  )
}