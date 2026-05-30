
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_CATEGORIES, NAV_MENU_ITEMS } from '../data/navData';

import '../styles/Navbar-mobile.css';
import '../styles/Navbar-desktop.css';

export function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">

      <button aria-controls="mobile-menu" aria-expanded={isOpen} aria-label="menu"
        className={`menu-container ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}>
        <div className="menu-top" ></div>
        <div className="menu-middle" ></div>
        <div className="menu-bottom" ></div>
      </button>

      <h1 className="title-container"  >
        <NavLink aria-label="Kick Vault" to="/">
          <span className="title title-weight"
          >kickvault</span>
        </NavLink>
      </h1>

      <nav aria-label="Main Navigation" id="mobile-menu"
        className={`nav-menu ${isOpen ? 'active' : ''}`}>

        <div className="title-container-nav" >
          <NavLink aria-label="Kick Vault" to="/">
            <span onClick={closeMenu} className="title-nav title-weight">kickvault</span>
          </NavLink>
        </div>

        <div className="nav-ul ">
          <div className="product-category-container" >
            <ul className="category-ul">

              {NAV_CATEGORIES.map(({ id, name, path }) => {
                return (
                  <li key={id} className="category-li">
                    <NavLink className="container-name" onClick={closeMenu} 
                    to={path} >
                      <span className="category-name" >
                        {name}
                      </span>
                      {/* Hide visual arrow icon from screen readers to avoid audio clutter */}
                      <div aria-hidden="true" className="arrow-container" >
                        <span className="arrow-top"></span>
                        <span className="arrow-bottom"></span>
                      </div>
                    </NavLink>
                  </li>
                )
              })}

            </ul>
          </div>

          <ul className="menu-container-list">

            {NAV_MENU_ITEMS.map(({ id, name, path }) => {
              return (
                <li key={id} className="menu-li" >
                  <NavLink className="menu-name" onClick={closeMenu}
                    to={path} >{name}
                  </NavLink>
                </li>
              )
            })}

          </ul>

        </div>

      </nav>

    </header >
  )
}