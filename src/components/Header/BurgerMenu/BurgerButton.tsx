import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleIsOpen } from '../../../store/reducer/burgerMenu';
import './BurgerButton.scss';

const HamburgerMenuButton = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.burgerMenu.isOpen);

  const handleOpen = () => {
    dispatch(toggleIsOpen());
  };

  return (
    <div className="burgerMenuButton" onClick={() => handleOpen()}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          className={`line line1 ${isOpen ? 'open' : ''}`}
          x1="10"
          y1="12"
          x2="30"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          className={`line line2 ${isOpen ? 'open' : ''}`}
          x1="10"
          y1="20"
          x2="30"
          y2="20"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          className={`line line3 ${isOpen ? 'open' : ''}`}
          x1="10"
          y1="28"
          x2="30"
          y2="28"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default HamburgerMenuButton;
