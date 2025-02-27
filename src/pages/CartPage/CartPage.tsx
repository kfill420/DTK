import { BiBasket } from "react-icons/bi";
import './CartPage.scss'
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { actionDeleteOneFromCart } from "../../store/thunks/checkCart";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { actionAddToCartPayloadI } from "../../@types/cart";
import { actionCheckCartOffline, actionDeleteFromCartOffline } from "../../store/reducer/cart";
import { setIsOpen } from "../../store/reducer/modal";


function CartPage({ cancelFunction }: { cancelFunction?: () => void }) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.account.isAuthentificated);
  const cartConnected = useAppSelector((state) => state.cart.cartConnected);
  const cartVisitor = useAppSelector((state) => state.cart.cartVisitor);
  const [cart, setCart] = useState<actionAddToCartPayloadI[]>([]);

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem('cartVisitor') || '[]');
    dispatch(actionCheckCartOffline(ls))
  }, [dispatch]);

  useEffect(() => {
    if (isLogin) {
      setCart(cartConnected);
    } else {
      setCart(cartVisitor);
    }
  }, [isLogin, cartConnected, cartVisitor]);

  const handleDeleteButton = (id: number) => {
    if (isLogin)
      dispatch(actionDeleteOneFromCart(id));
    else dispatch(actionDeleteFromCartOffline(id))
  }

  if (cart && cart.length > 0) {
    return (
      <div className='cartPage'>
        {location.pathname !== '/cart' &&
          <div className="cartPage_exit">
            <IoCloseSharp size={25} onClick={cancelFunction} />
          </div>
        }
        <div className="cartPage_container">
          {cart && cart.map((product, index) => (
            <div key={index} className="cartPage_container_item">
              <div className="cartPage_container_item_picture">
                <img src={product.product.image_url[product.color]} alt="" />
              </div>
              <div className="cartPage_container_item_infos">
                <h3 className="cartPage_container_item_infos_title">{product.product.name}</h3>
                <span className="cartPage_container_item_infos_price">{`€${product.price},00`}</span>
                <span className="cartPage_container_item_infos_details">{product.product.color_name[product.color]} / {product.state} / {product.stockage}</span>
                <div className="cartPage_container_item_infos_quantityContainer">
                  <span className="cartPage_container_item_infos_quantityContainer_quantity">{product.quantity}</span>
                  <button className="cartPage_container_item_infos_quantityContainer_deleteBtn" onClick={() => handleDeleteButton(product.id || index)}>Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cartPage_total">
          <div className="cartPage_total_subtotal">
            <span className="cartPage_total_title">Sous-total</span>
            <span className="cartPage_total_price">€{cart.reduce((acc, product) => acc + product.price * product.quantity, 0)},00</span>
          </div>
          <div className="cartPage_total_total">
            <span className="cartPage_total_title">Total</span>
            <span className="cartPage_total_price">€{cart.reduce((acc, product) => acc + product.price * product.quantity, 0)},00</span>
          </div>
          <span className="cartPage_total_taxes">Taxes incluses.</span>
          <textarea className="cartPage_total_note" name="note" id="note" placeholder="Note de la commande"></textarea>
          <Link onClick={() => dispatch(setIsOpen({ modal: 'modalCartIsOpen', value: false }))} to="/checkout" className="cartPage_total_btn">Commander</Link>
        </div>
        <div className="cartPage_payment">
          <span className="cartPage_payment_title">Nous acceptons</span>
          <div className="cartPage_payment_icons">
            <img className="cartPage_payment_icons_icon" src="/img/paymentMethod/visa2.png" alt="icone visa" />
            <img className="cartPage_payment_icons_icon" src="/img/paymentMethod/mscard.png" alt="icone mastercard" />
            <img className="cartPage_payment_icons_icon" src="/img/paymentMethod/amex.png" alt="icone amex" />
          </div>
        </div>
      </div>
    )
  } else if (cart && cart.length === 0) {
    return (
      <div className='cartPage cartPage-noCart'>
        <div className="cartPage_noCart">
          <div className="cartPage_noCart_iconContainer">
            <BiBasket size={40} className="cartPage_noCart_iconContainer_icon" />
            <span className="cartPage_noCart_iconContainer_nbrArticle">0</span>
          </div>
          <h2 className="cartPage_noCart_title">Panier vide</h2>
          <Link to="/" className="cartPage_noCart_link" onClick={cancelFunction}>Explorer nos produits</Link>
        </div>
      </div>
    )
  }
}

export default CartPage;
