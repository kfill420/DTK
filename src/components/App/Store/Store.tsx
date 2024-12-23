import './Store.scss'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import actionCheckProduct from '../../../store/thunks/checkProduct';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ColorRadio from '../ColorRadio/ColorRadio';

function Store() {
  const dispatch = useAppDispatch();

  const list = useAppSelector((state) => state.product.list);

  useEffect(() => {
    dispatch(actionCheckProduct());
  }, [dispatch]);


  return (
    <div className="store">
      <div>
        <span className="store_intro">Nos meilleurs ventes</span>
        <h3 className="store_title">Commandez dès maintenant !</h3>
      </div>
      <div className="store_list">
        {list.map((product) => (
          <div key={product.id} className="store_list_product">
            <Link to={`/products/${product.name.replace(/\s+/g, '')}/${product.id}`}>
              <img src={product.image_url[0]} alt={product.name} />
            </Link>
            <span className="store_list_product_title">{product.name}</span>
            <span className="store_list_product_price">A partir de {product.price[0]}€</span>
            <div className="store_list_product_colors">
              {/* {product.color_code.map((color, index) => (
                <input key={index} type="radio" name={product.name} className="store_list_product_colors_color" defaultChecked={index === 0} style={{ backgroundColor: color }}></input>
              ))} */}
              <ColorRadio colors={product.color_code} productName={product.name} />
            </div>

          </div>
        ))
        }
      </div>

    </div >
  )
}

export default Store;
