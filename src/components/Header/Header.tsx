import './Header.scss'
import { FaRegUser } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";

import { useAppSelector } from '../../hooks/redux';
import BurgerButton from './BurgerMenu/BurgerButton';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import { useLocation } from 'react-router-dom';

function Header() {
  // const dispatch = useAppDispatch();
  // const isLogged = useAppSelector((state) => state.account.logged);
  const location = useLocation();
  const buergerMenuIsOpen = useAppSelector((state) => state.burgerMenu.isOpen);

  return (
    <>
      <div className={`${location.pathname === '/' ? 'header header-home' : 'header'}`}>
        <div className="header_burger">
          <BurgerButton />
        </div>
        <div className="header_logo">
          <span className="header_logo_text">DTK</span>
        </div>
        <ul className="header_navbar">
          <li>Accueil</li>
          <li>iPhone</li>
          <li>Samsung</li>
          <li>Contact</li>
          <li>FAQ</li>
        </ul>
        <div className="header_profile">
          <FaRegUser size={20} />
          <RiShoppingCart2Line size={20} />
        </div>
      </div>
      <BurgerMenu isOpen={buergerMenuIsOpen} />
    </>
  )
}

export default Header;
