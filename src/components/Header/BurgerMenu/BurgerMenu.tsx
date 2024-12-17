import { useAppDispatch } from '../../../hooks/redux';
import { CSSTransition } from 'react-transition-group';
import { toggleIsOpen } from '../../../store/reducer/burgerMenu';
import { IoLogoInstagram, IoLogoTiktok, IoLogoWhatsapp, IoCloseSharp } from "react-icons/io5";
import { RiSnapchatFill } from "react-icons/ri";
import './BurgerMenu.scss';
import { useRef } from 'react';

const HamburgerMenu = ({ isOpen }: { isOpen: boolean }) => {
  const dispatch = useAppDispatch();
  const burgerMenuBackgroundRef = useRef<HTMLDivElement>(null);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    dispatch(toggleIsOpen());
  };

  return (
    <div>
      <CSSTransition nodeRef={burgerMenuBackgroundRef} in={isOpen} timeout={300} classNames="fade" unmountOnExit>
        <div ref={burgerMenuBackgroundRef} className="burgerMenu_background" onClick={handleOpen}></div>
      </CSSTransition>

      <CSSTransition nodeRef={burgerMenuRef} in={isOpen} timeout={300} classNames="slide-up" unmountOnExit>
        <div ref={burgerMenuRef} className="burgerMenu">
          <div className="burgerMenu_container">
            <ul className="burgerMenu_list">
              <li>Accueil</li>
              <li>Iphone</li>
              <li>Smasung</li>
              <li>Contact</li>
              <li>FAQ</li>
            </ul>
            <div className="burgerMenu_footer">
              <div className="burgerMenu_footer_socialNetworks">
                <IoLogoInstagram size={25} />
                <IoLogoTiktok size={25} />
                <RiSnapchatFill size={25} />
                <IoLogoWhatsapp size={25} />
              </div>
              <div className="burgerMenu_footer_account">
                <span className="burgerMenu_footer_account_text">Mon compte</span>
              </div>
            </div>
            <button className="burgerMenu_exitBtn" onClick={handleOpen}>
              <IoCloseSharp size={25} />
            </button>
          </div>
        </div>
      </CSSTransition >
    </div >





  );
};

export default HamburgerMenu;
