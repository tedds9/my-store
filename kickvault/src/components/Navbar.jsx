
import { useState } from 'react'
import './../styles/Navbar.css';
import menu from '../images/icons/menu.svg';
import x from '../images/icons/x.svg';

export function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">

      {!isOpen && <img className="menu-toggle"
        aria-label='menu'
        alt="menu"
        onClick={() => setIsOpen(!isOpen)} 
        src={menu}>  
      </img>}

      <h1 className="title">
        <a>
          <span>kickvault</span>
        </a>
      </h1>
      
      <nav className={isOpen ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-ul">
          <li ><a aria-label='Home' href="./">Home</a></li>
          <li ><a aria-label='Product' href="./">Products</a></li>
          <li ><a aria-label='Favorites' 
          href="./">Favorites</a></li>
          <li ><a aria-label='Cart' href="./">Cart</a></li>
        </ul>
      </nav>

      {isOpen && <img className="close-toggle"
        aria-label='close'
        alt="close"
        onClick={() => setIsOpen(!isOpen)} 
        src={x}>
      </img>}

    </header>
  )
}