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
import SpinnerSquare from '../components/App/SpinnerSquare/SpinnerSquare';
import CollectionPage from './CollectionPage/CollectionPage';
import CartPage from "./CartPage/CartPage";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const noFooterPage = location.pathname === '/login' || location.pathname === '/profile/params' || location.pathname === '/profile/order' || location.pathname === '/profile/infos';
  const isAuthentificated = useAppSelector((state) => state.account.isAuthentificated);
  const account = useAppSelector((state) => state.account.account);
  const tokenIsLoading = useAppSelector((state) => state.account.tokenIsLoading);
  const initialCheck = useAppSelector((state) => state.account.initialCheck);
  const modalIsOpen = useAppSelector((state) => state.ModalMenu.burgerModalIsOpen);

  useEffect(() => {
    dispatch(actionCheckToken())
  }, [dispatch]);

  useEffect(() => {
    if (modalIsOpen)
      document.body.style.overflow = 'hidden';
    else
      document.body.style.overflow = 'auto';
  }, [modalIsOpen]);

  if (tokenIsLoading || initialCheck) {
    return (
      <div className="loader">
        <SpinnerSquare isOpen={tokenIsLoading || initialCheck} />
      </div>
    )
  }

  return (
    <div className="app">

      <SpinnerSquare isOpen={tokenIsLoading || initialCheck} />

      <Header isAuthentificated={isAuthentificated} email={account.email} account_id={account.id} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection/:brand" element={<CollectionPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<PrivateRoute isAuthenticated={isAuthentificated}><CartPage /></PrivateRoute>}></Route>
        <Route path="/profile" element={<PrivateRoute isAuthenticated={isAuthentificated}><ProfilePage /></PrivateRoute>}>
          <Route path="" element={<Navigate to="infos" />} />
          <Route path="params" element={<Params />} />
          <Route path="order" element={<Order />} />
          <Route path="infos" element={<Infos account={account} />} />
        </Route>
      </Routes>
      {!noFooterPage && <Footer />}

    </div>
  )
}

export default App;
