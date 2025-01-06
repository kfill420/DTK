import './Header.scss'
import { FaRegUser } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import { PiSignInFill } from "react-icons/pi";
import { PiUserCircleThin } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import BurgerButton from './BurgerMenu/BurgerButton';
import StoreBurgerMenu from './BurgerMenu/StoreBurgerMenu/BurgerMenu';
import ProfileBurgerMenu from './BurgerMenu/ProfileBurgerMenu/ProfileBurgerMenu';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';
import { actionLogOut } from '../../store/reducer/account';
import ModalConfirm from '../Modal/ModalConfirm/ModalConfirm';
import { actionDeleteAccount } from '../../store/thunks/checkAccount';
import { setIsOpen } from '../../store/reducer/modal';

interface HeaderI {
  isAuthentificated: boolean;
  email: string;
  account_id?: number | null;
}

function Header({ isAuthentificated, email, account_id }: HeaderI) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const burgerMenuIsOpen = useAppSelector((state) => state.ModalMenu.burgerModalIsOpen);
  const confirmModalIsOpen = useAppSelector((state) => state.ModalMenu.confirmModalIsOpen);
  const [popupisOpen, setpopupIsOpen] = useState(false);

  const handlePopupButton = () => {
    setpopupIsOpen(!popupisOpen);
  }

  const handleDisconnectButton = () => {
    dispatch(actionLogOut());
  }

  const handleDeleteAccountButton = () => {
    dispatch(setIsOpen({ modal: 'confirmModalIsOpen', value: false }));
    dispatch(actionDeleteAccount(account_id));
  }

  const handleCancelAccounDeletetButton = () => {
    dispatch(setIsOpen({ modal: 'confirmModalIsOpen', value: false }));
  }

  return (
    <>
      {
        location.pathname === '/profile/params' || location.pathname === '/profile/order' || location.pathname === '/profile/infos' ?
          <div className="header-profile">
            <div className="header-profile_burger">
              <BurgerButton />
            </div>
            <ul className="header-profile_left">
              <Link to="/" className="header-profile_left_logo">DTK</Link>
              <Link to="/" className="header-profile_left_link">Boutique</Link>
              <NavLink to="/profile/order" className={({ isActive }) => (isActive ? 'header-profile_left_link header-profile_left_link-active' : 'header-profile_left_link')}>Commandes</NavLink>
            </ul>
            <div onClick={handlePopupButton} className="header-profile_right">
              <div className="header-profile_right_container">
                <PiUserCircleThin size={30} />
                {popupisOpen ? <IoIosArrowDown size={15} /> : <IoIosArrowUp size={15} />}
              </div>
              <div className={popupisOpen ? "header-profile_right_popup header-profile_right_popup-isOpen" : "header-profile_right_popup"}>
                <div className="header-profile_right_popup_header">
                  <PiUserCircleThin size={30} />
                  <span className="header-profile_right_popup_header_email">{email}</span>
                </div>
                <div className="header-profile_right_popup_content">
                  <NavLink to="/profile/infos" className={({ isActive }) => (isActive ? 'header-profile_right_popup_content_link header-profile_right_popup_content_link-active' : 'header-profile_right_popup_content_link')}>Profil</NavLink>
                  <NavLink to="/profile/params" className={({ isActive }) => (isActive ? 'header-profile_right_popup_content_link header-profile_right_popup_content_link-active' : 'header-profile_right_popup_content_link')}>Paramètres</NavLink>
                  <button onClick={handleDisconnectButton} className="header-profile_right_popup_content_link">Se déconnecter</button>
                </div>
              </div>
            </div>
          </div>
          :
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
              {isAuthentificated ?
                <Link to="/profile/infos" className={location.pathname === '/' ? "header_profile_links header_profile_links-home" : "header_profile_links"}>
                  <FaRegUser className="header_profile_links_link" size={20} />
                </Link>
                :
                <Link to="/login" className={location.pathname === '/' ? "header_profile_links header_profile_links-home" : "header_profile_links"}>
                  <PiSignInFill className="header_profile_links_link" size={20} />
                </Link>
              }

              <Link to="/login" className={location.pathname === '/' ? "header_profile_links header_profile_links-home" : "header_profile_links"}>
                <RiShoppingCart2Line className="header_profile_links_link" size={20} />
              </Link>
            </div>
          </div >
      }
      {location.pathname === '/profile/params' || location.pathname === '/profile/order' || location.pathname === '/profile/infos' ? <ProfileBurgerMenu isOpen={burgerMenuIsOpen} email={email} /> : <StoreBurgerMenu isOpen={burgerMenuIsOpen} />}
      {
        isAuthentificated && location.pathname === '/profile/params' && <ModalConfirm isOpen={confirmModalIsOpen} title='Confirmation' content='Cette action est irréversible, souhaitez-vous vraiment supprimer définitivement votre compte ?' acceptFunction={handleDeleteAccountButton} cancelFunction={handleCancelAccounDeletetButton} />
      }


    </>
  )
}

export default Header;
