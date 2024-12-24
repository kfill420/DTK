import './App.scss'

import HomePage from './HomePage/HomePage';
import ProductPage from './ProductPage/ProductPage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from '../components/App/ScrollToTop/ScrollToTop';
import LoginPage from './LoginPage/LoginPage';

// import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function App() {
  // const dispatch = useAppDispatch();
  // const isLogged = useAppSelector((state) => state.account.logged);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  )
}

export default App;
