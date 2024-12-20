import './App.scss'

import Header from '../Header/Header';
import Carousel from './Carousel/Carousel';
import { slides } from './Carousel/carouselData.json';
import { data } from './Service/serviceData.json';
import Service from './Service/Service';
import Store from './Store/Store';

// import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function App() {
  // const dispatch = useAppDispatch();
  // const isLogged = useAppSelector((state) => state.account.logged);

  const validatedData = data.map(item => ({
    ...item,
    iconPackage: ['Fa', 'Ti', 'Tb'].includes(item.iconPackage) ? item.iconPackage as 'Fa' | 'Ti' | 'Tb' : 'Fa',
  }));

  return (
    <div className="app">
      <Header />
      <Carousel slides={slides} arrows={false} indicators={true} interval={6} />
      <Service data={validatedData} />
      <Store />
    </div>
  )
}

export default App;
