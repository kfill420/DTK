import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { BiBasket } from "react-icons/bi";
import './CartPage.scss'
import { Link } from "react-router-dom";


function CartPage() {
  const dispatch = useAppDispatch();

  return (
    <div className="cartPage">
      <div className="cartPage_noCart">
        <div className="cartPage_noCart_iconContainer">
          <BiBasket size={40} className="cartPage_noCart_iconContainer_icon" />
          <span className="cartPage_noCart_iconContainer_nbrArticle">0</span>
        </div>
        <h2 className="cartPage_noCart_title">Panier vide</h2>
        <Link to="/" className="cartPage_noCart_link">Explorer nos produits</Link>
      </div>
    </div>
  )
}

export default CartPage;
