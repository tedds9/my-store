
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import styles from './navbar.module.css';


export function Navbar() {

  const { categoryLinks, primaryLinks, toggleBasket, basketSelection } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const totalBasketUnits = basketSelection.reduce((runningTotal, currentItem) =>
    runningTotal + currentItem.quantity, 0);

  return (
    <header className={styles.navigationContext}>
      <div className={`${styles.navigationViewport}`} >
        <NavLink className={styles.brandLink} to="/" onClick={closeMenu} >
          <span className={`${styles.brandTitle}`}
          >kickvault</span>
        </NavLink>

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

        <div className={styles.actionCluster}>
          <button type="button" className={styles.bagAction} aria-label="Open bag"
            onClick={() => { closeMenu(); toggleBasket('active'); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.bagIcon} >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" strokeLinecap="round"
                strokeLinejoin="round" />
              <path d="M3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round"
                strokeLinejoin="round" />
            </svg>
            {totalBasketUnits > 0 ? (<span className={styles.countBadge}>
              {totalBasketUnits}
            </span>) : null}
          </button>

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
        </div>
      </div >

    </header>

  )
}