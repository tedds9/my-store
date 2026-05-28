
import { useState } from 'react'

import '../styles/Navbar-menu-burger.css'
import '../styles/Navbar-mobile.css';
import '../styles/Navbar-desktop.css';

export function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">

      <button aria-label="menu"
        className={!isOpen ? 'menu-container' : 'menu-container active'}
        onClick={() => setIsOpen(!isOpen)}>
        <div className={!isOpen ? 'menu-top menu-color' : 'menu-top active menu-color'}></div>
        <div className={!isOpen ? 'menu-middle menu-color' : 'menu-middle active menu-color'} ></div>
        <div className={!isOpen ? 'menu-bottom menu-color' : 'menu-bottom active menu-color'}></div>
      </button>


      <h1 className="title-container" aria-label="title kickvault" >
        <a href="./">
          <span className="title title-weight">kickvault</span>
        </a>
      </h1>

      <nav className={isOpen ? 'nav-menu active' : 'nav-menu'}>
        <h1 className="title-container-nav" aria-label="title kickvault" >
          <a href="./">
            <span className="title-nav title-weight">kickvault</span>
          </a>


        </h1>

        <ul className="nav-ul ">
          <li ><a className="color-primary" aria-label="Home" href="./">Home</a></li>
          <li ><a className="color-primary" aria-label="Product" href="./">Products</a></li>
          <li ><a className="color-primary" aria-label="Favorites"
            href="./">Favorites</a></li>
          <li ><a className="color-primary" aria-label="Cart" href="./">Cart</a></li>

        </ul>    

      </nav>

    </header>
  )
}