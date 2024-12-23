import './App.scss'

import HomePage from './HomePage/HomePage';
import ProductPage from './ProductPage/ProductPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Route, Routes } from 'react-router-dom';

// import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function App() {
  // const dispatch = useAppDispatch();
  // const isLogged = useAppSelector((state) => state.account.logged);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products/:name/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
