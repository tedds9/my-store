
import { useState } from 'react'
import { Link } from 'react-router-dom';

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
        <Link to="/">
          <span className="title title-weight">kickvault</span>
        </Link>
      </h1>

      <nav className={isOpen ? 'nav-menu active' : 'nav-menu'}>
        <h1 className="title-container-nav" aria-label="title kickvault" >
          <Link to="/">
            <span className="title-nav title-weight">kickvault</span>
          </Link>


        </h1>

        <ul className="nav-ul ">
          <div className="product-category-container" >
            <Link className="container-name" onClick={() => setIsOpen(!isOpen)} to="/category/Men" >

              <h2 className="category-name" >
                Men
              </h2>
              <div className="arrow-container" >
                <span className="arrow-top"></span>
                <span className="arrow-bottom"></span>
              </div>

            </Link>
            <Link className="container-name" onClick={() => setIsOpen(!isOpen)} to="/category/Women" >

              <h2 className="category-name" >
                Women
              </h2>
              <div className="arrow-container" >
                <span className="arrow-top"></span>
                <span className="arrow-bottom"></span>
              </div>

            </Link>
            <div>
              <Link className="container-name" onClick={() => setIsOpen(!isOpen)} to="/category/Luxury Sneakers" >
                <h2 className="category-name" >
                  Luxury Sneakers
                </h2>
                <div className="arrow-container" >
                  <span className="arrow-top"></span>
                  <span className="arrow-bottom"></span>
                </div>
              </Link>
            </div>
          </div>
          <div className="menu-container-list">
          <li ><Link to="/" className="menu-name" aria-label="Home" onClick={() => setIsOpen(!isOpen)} >Home</Link></li>
          <li ><a className="menu-name" aria-label="Product" href="./">Products</a></li>
          <li ><a className="menu-name" aria-label="Favorites"
            href="./">Favorites</a></li>
          <li ><a className="menu-name " aria-label="Cart" href="./">Cart</a></li>
          </div>
        </ul>

      </nav>

    </header>
  )
}