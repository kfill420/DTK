import { useEffect, useState, useCallback, useRef, MutableRefObject } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CarouselI } from '../../../@types/carousel';
import './Carousel.scss'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Carousel({ slides, arrows, indicators, interval }: CarouselI) {
  const [slideState, setSlideState] = useState(0);
  const carouselRefs = useRef<(MutableRefObject<HTMLImageElement | null>)[]>([]);

  const previousSlide = () => {
    setSlideState(slideState === 0 ? slides.length - 1 : slideState - 1);
  }

  const nextSlide = useCallback(() => {
    setSlideState(slideState => slideState === slides.length - 1 ? 0 : slideState + 1);
  }, [slides.length]);

  useEffect(() => {
    if (interval === 0) return;
    const intervalSlide = setInterval(() => {
      nextSlide();
    }, interval * 1000);

    return () => clearInterval(intervalSlide);
  }, [nextSlide, interval]);

  return (
    <div className="carousel">
      {arrows && <IoIosArrowBack className="carousel_arrow carousel_arrow-left" onClick={previousSlide} />}

      {
        slides.map((slide, index) => {
          return (
            <div key={index} style={{ height: "100%" }}>
              <CSSTransition nodeRef={carouselRefs.current[index]} in={slideState === index} timeout={300} classNames="fade" unmountOnExit key={index}>
                <img ref={carouselRefs.current[index]} src={slide.src} alt={slide.alt} className={slideState === index ? "carousel_slide" : "carousel_slide carousel_slide-hidden"} />
              </CSSTransition>

              <div className={slideState === index ? "carousel_content" : "carousel_content-hidden"}>
                {slide.title && <span className="carousel_content_title">{slide.title}</span>}
                {slide.description && <span className="carousel_content_description">{slide.description}</span>}
                {slide.button && <button className="carousel_content_button">{slide.button}</button>}
              </div>

            </div>

          )
        })
      }

      {arrows && <IoIosArrowForward className="carousel_arrow carousel_arrow-right" onClick={nextSlide} />}

      {
        indicators && (
          <span className="carousel_indicators">
            {
              slides.map((_, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setSlideState(index)}
                    className={slideState === index ? "carousel_indicators_indicator carousel_indicators_indicator-active" : "carousel_indicators_indicator carousel_indicators_indicator-inactive"}>
                  </button>
                )
              })
            }
          </span>
        )
      }

    </div>
  )
}

export default Carousel;
