import './App.scss'

import Header from '../Header/Header';
import Carousel from './Carousel/Carousel';
import { slides } from './Carousel/carouselData.json';

// import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function App() {
  // const dispatch = useAppDispatch();
  // const isLogged = useAppSelector((state) => state.account.logged);

  return (
    <div className="app">
      <Header />
      <Carousel slides={slides} arrows={false} indicators={true} interval={0} />
    </div>
  )
}

export default App;
