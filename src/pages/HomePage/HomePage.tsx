import './HomePage.scss'

import Carousel from '../../components/App/Carousel/Carousel';
import { slides } from '../../components/App/Carousel/carouselData.json';
import { data } from '../../components/App/Service/serviceData.json';
import Service from '../../components/App/Service/Service';
import Store from '../../components/App/Store/Store';
import Questions from '../../components/App/Questions/Questions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect } from 'react';
import { actionCheckProduct } from '../../store/thunks/checkProduct';

// import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function HomePage() {
  // const dispatch = useAppDispatch();
  // const isLogged = useAppSelector((state) => state.account.logged);

  const dispatch = useAppDispatch();

  const list = useAppSelector((state) => state.product.list);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(actionCheckProduct());
    }
  }, [dispatch, list.length]);

  const validatedData = data.map(item => ({
    ...item,
    iconPackage: ['Fa', 'Ti', 'Tb'].includes(item.iconPackage) ? item.iconPackage as 'Fa' | 'Ti' | 'Tb' : 'Fa',
  }));

  return (
    <div className="home">
      <Carousel slides={slides} arrows={false} indicators={true} interval={6} />
      <Service data={validatedData} />
      <Store subtitle="Nos meilleurs ventes" title="Commandez dès maintenant !" />
      <Questions />
    </div>
  )
}

export default HomePage;
