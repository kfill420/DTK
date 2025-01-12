import './App.scss'

import HomePage from './HomePage/HomePage';
import ProductPage from './ProductPage/ProductPage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from '../components/App/ScrollToTop/ScrollToTop';
import LoginPage from './LoginPage/LoginPage';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { actionCheckToken } from '../store/thunks/checkLogin';
import { NonPrivateRoute, PrivateRoute } from '../components/App/PrivateRoute/PrivateRoute';
import Order from './ProfilePage/Order/Order';
import Params from './ProfilePage/Params/Params';
import Infos from './ProfilePage/Infos/Infos';
import SpinnerSquare from '../components/App/SpinnerSquare/SpinnerSquare';
import CollectionPage from './CollectionPage/CollectionPage';
import CartPage from "./CartPage/CartPage";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const noFooterPage = location.pathname === '/login' || location.pathname === '/params' || location.pathname === '/order' || location.pathname === '/profile';
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
        <Route path="/login" element={<NonPrivateRoute isAuthenticated={isAuthentificated}><LoginPage /></NonPrivateRoute>}></Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/params" element={<PrivateRoute isAuthenticated={isAuthentificated}><Params /></PrivateRoute>} />
        <Route path="/order" element={<PrivateRoute isAuthenticated={isAuthentificated}><Order /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute isAuthenticated={isAuthentificated}>{<Infos account={account} />}</PrivateRoute>} />
      </Routes>
      {!noFooterPage && <Footer />}

    </div>
  )
}

export default App;
