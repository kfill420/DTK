import './Header.scss'
import { FaRegUser } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";

import { useAppSelector } from '../../hooks/redux';
import BurgerButton from './BurgerMenu/BurgerButton';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import { Link, NavLink, useLocation } from 'react-router-dom';

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
          <Link to="/" className="header_logo_link">
            <span className={`${location.pathname === '/' ? 'header_logo_link_text header_logo_link_text-home' : 'header_logo_link_text'}`}>DTK</span>
          </Link>
        </div>
        <ul className="header_navbar">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'header_navbar_link header_navbar_link-active' : location.pathname === '/' ? 'header_navbar_link header_navbar_link-home' : 'header_navbar_link')}>Accueil</NavLink>
          <NavLink to="/collection/iPhone" className={({ isActive }) => (isActive ? 'header_navbar_link header_navbar_link-active' : location.pathname === '/' ? 'header_navbar_link header_navbar_link-home' : 'header_navbar_link')}>iPhone</NavLink>
          <NavLink to="/collection/Samsung" className={({ isActive }) => (isActive ? 'header_navbar_link header_navbar_link-active' : location.pathname === '/' ? 'header_navbar_link header_navbar_link-home' : 'header_navbar_link')}>Smasung</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'header_navbar_link header_navbar_link-active' : location.pathname === '/' ? 'header_navbar_link header_navbar_link-home' : 'header_navbar_link')}>Contact</NavLink>
          <NavLink to="/faq" className={({ isActive }) => (isActive ? 'header_navbar_link header_navbar_link-active' : location.pathname === '/' ? 'header_navbar_link header_navbar_link-home' : 'header_navbar_link')}>FAQ</NavLink>
        </ul>
        <div className="header_profile">
          <Link to="/login" className={location.pathname === '/' ? "header_profile_links header_profile_links-home" : "header_profile_links"}>
            <FaRegUser className="header_profile_links_link" size={20} />
          </Link>
          <Link to="/login" className={location.pathname === '/' ? "header_profile_links header_profile_links-home" : "header_profile_links"}>
            <RiShoppingCart2Line className="header_profile_links_link" size={20} />
          </Link>
        </div>
      </div >
      <BurgerMenu isOpen={buergerMenuIsOpen} />
    </>
  )
}

export default Header;
