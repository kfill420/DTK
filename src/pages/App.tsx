import './App.scss'

import HomePage from './HomePage/HomePage';
import ProductPage from './ProductPage/ProductPage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from '../components/App/ScrollToTop/ScrollToTop';
import LoginPage from './LoginPage/LoginPage';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { actionCheckToken } from '../store/thunks/checkLogin';
import PrivateRoute from '../components/App/PrivateRoute/PrivateRoute';
import ProfilePage from './ProfilePage/ProfilePage';
import Order from './ProfilePage/Order/Order';
import Params from './ProfilePage/Params/Params';
import Infos from './ProfilePage/Infos/Infos';

// import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function App() {
  // const dispatch = useAppDispatch();
  // const isLogged = useAppSelector((state) => state.account.logged);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const noFooterPage = location.pathname === '/login' || location.pathname === '/profile/params' || location.pathname === '/profile/order' || location.pathname === '/profile/infos';
  const isAuthentificated = useAppSelector((state) => state.account.isAuthentificated);


  useEffect(() => {
    dispatch(actionCheckToken())
  })

  return (
    <div className="app">
      <Header isAuthentificated={isAuthentificated} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<PrivateRoute isAuthenticated={isAuthentificated}><ProfilePage /></PrivateRoute>}>
          <Route path="" element={<Navigate to="infos" />} />
          <Route path="params" element={<Params />} />
          <Route path="order" element={<Order />} />
          <Route path="infos" element={<Infos />} />
        </Route>
      </Routes>
      {!noFooterPage && <Footer />}
    </div>
  )
}

export default App;
