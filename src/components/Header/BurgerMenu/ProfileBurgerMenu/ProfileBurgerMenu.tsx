import { useAppDispatch } from '../../../../hooks/redux';
import { CSSTransition } from 'react-transition-group';
import { setIsOpen, toggleIsOpen } from '../../../../store/reducer/burgerMenu';
import { PiUserCircleThin } from "react-icons/pi";
import './ProfileBurgerMenu.scss';
import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { actionLogOut } from '../../../../store/reducer/account';

const HamburgerMenu = ({ isOpen, email }: { isOpen: boolean, email: string }) => {
  const dispatch = useAppDispatch();
  const burgerMenuBackgroundRef = useRef<HTMLDivElement>(null);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const handleOpen = () => {
    dispatch(toggleIsOpen());
  };

  const handleDisconnectButton = () => {
    dispatch(actionLogOut());
  }

  useEffect(() => {
    dispatch(setIsOpen(false))
  }, [location.pathname, dispatch]);

  return (
    <div>
      <CSSTransition nodeRef={burgerMenuBackgroundRef} in={isOpen} timeout={300} classNames="pburgerMenu_fade" unmountOnExit>
        <div ref={burgerMenuBackgroundRef} className="pburgerMenu_background" onClick={handleOpen}></div>
      </CSSTransition>

      <CSSTransition nodeRef={burgerMenuRef} in={isOpen} timeout={300} classNames="pburgerMenu_slide-up" unmountOnExit>
        <div ref={burgerMenuRef} className="pburgerMenu">
          <div className="pburgerMenu_container">
            <div className="pburgerMenu_container_header">
              <div className="pburgerMenu_container_header_mail">
                <PiUserCircleThin size={30} />
                <span className="pburgerMenu_container_header_mail_text">{email}</span>
              </div>
              <ul className="pburgerMenu_list">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'pburgerMenu_list_link pburgerMenu_list_link-active' : 'pburgerMenu_list_link')}>Boutique</NavLink>
                <NavLink to="/profile/order" className={({ isActive }) => (isActive ? 'pburgerMenu_list_link pburgerMenu_list_link-active' : 'pburgerMenu_list_link')}>Commandes</NavLink>
              </ul>
            </div>

            <div className="pburgerMenu_footer">
              <NavLink to="/profile/infos" className={({ isActive }) => (isActive ? 'pburgerMenu_footer_link pburgerMenu_footer_link-active' : 'pburgerMenu_footer_link')}>Profil</NavLink>
              <NavLink to="/profile/params" className={({ isActive }) => (isActive ? 'pburgerMenu_footer_link pburgerMenu_footer_link-active' : 'pburgerMenu_footer_link')}>Paramètres</NavLink>
              <button onClick={handleDisconnectButton} className="pburgerMenu_footer_link">Se déconnecter</button>
            </div>
          </div>
        </div>
      </CSSTransition >
    </div >
  );
};

export default HamburgerMenu;
