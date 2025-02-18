import './App.scss'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from '../components/App/ScrollToTop/ScrollToTop';
import { Suspense, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { actionCheckToken } from '../store/thunks/checkLogin';
import { NonPrivateRoute, PrivateRoute } from '../components/App/PrivateRoute/PrivateRoute';
import SpinnerSquare from '../components/App/SpinnerSquare/SpinnerSquare';
import { lazy } from "react";
import { useModalsWithBackButton } from "../hooks/useModalsWithBackButton.ts";
import ContactPage from "./ContactPage/ContactPage.tsx";
import FaqPage from "./FaqPage/FaqPage.tsx";
import CheckoutPage from "./CheckoutPage/CheckoutPage.tsx";
import ConfirmationPage from "./ConfirmationPage/ConfirmationPage.tsx";

const HomePage = lazy(() => import('./HomePage/HomePage.tsx'));
const ProductPage = lazy(() => import('./ProductPage/ProductPage.tsx'));
const LoginPage = lazy(() => import('./LoginPage/LoginPage.tsx'));
const Order = lazy(() => import('./ProfilePage/Order/Order.tsx'));
const Params = lazy(() => import('./ProfilePage/Params/Params.tsx'));
const Infos = lazy(() => import('./ProfilePage/Infos/Infos.tsx'));
const CollectionPage = lazy(() => import('./CollectionPage/CollectionPage.tsx'));
const CartPage = lazy(() => import('./CartPage/CartPage.tsx'));

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const noFooterPage = location.pathname === '/login' || location.pathname === '/params' || location.pathname === '/order' || location.pathname === '/profile' || location.pathname === '/checkout';
  const isAuthentificated = useAppSelector((state) => state.account.isAuthentificated);
  const account = useAppSelector((state) => state.account.account);
  const burgerMenuIsOpen = useAppSelector((state) => state.ModalMenu.modals.burgerModalIsOpen);

  useModalsWithBackButton();

  useEffect(() => {
    dispatch(actionCheckToken())
  }, [dispatch]);

  useEffect(() => {
    if (burgerMenuIsOpen)
      document.body.style.overflow = 'hidden';
    else
      document.body.style.overflow = 'auto';
  }, [burgerMenuIsOpen]);

  return (
    <div className="app">

      <Suspense fallback={<SpinnerSquare isOpen={true} />}>
        <Header isAuthentificated={isAuthentificated} email={account.email} account_id={account.id} />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection/:brand" element={<CollectionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/login" element={<NonPrivateRoute isAuthenticated={isAuthentificated}><LoginPage /></NonPrivateRoute>}></Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<PrivateRoute isAuthenticated={isAuthentificated}><CheckoutPage /></PrivateRoute>} />
          <Route path="/params" element={<PrivateRoute isAuthenticated={isAuthentificated}><Params /></PrivateRoute>} />
          <Route path="/order" element={<PrivateRoute isAuthenticated={isAuthentificated}><Order /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute isAuthenticated={isAuthentificated}>{<Infos account={account} />}</PrivateRoute>} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>

        {!noFooterPage && <Footer />}
      </Suspense>

    </div>
  )
}

export default App;
