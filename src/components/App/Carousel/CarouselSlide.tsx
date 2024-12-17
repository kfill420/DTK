import { forwardRef, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Carousel.scss';

interface CarouselSlideProps {
  inProp: boolean;
  timeout: number;
  classNames: string;
  children: React.ReactNode;
}

const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(
  ({ inProp, timeout, classNames, children }, ref) => {
    // Utilisation correcte de ref avec React
    const internalRef = useRef<HTMLDivElement>(null);
    const nodeRef = (ref || internalRef) as React.RefObject<HTMLDivElement>;

    return (
      <CSSTransition
        nodeRef={nodeRef}
        in={inProp}
        timeout={timeout}
        classNames={classNames}
        unmountOnExit
      >
        <div ref={nodeRef}>{children}</div>
      </CSSTransition>
    );
  }
);

export default CarouselSlide;
