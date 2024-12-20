import './Store.scss'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import actionCheckProduct from '../../../store/thunks/checkProduct';
import { useEffect } from 'react';

function Store() {
  const dispatch = useAppDispatch();

  const list = useAppSelector((state) => state.product.list);
  console.log(list);


  useEffect(() => {
    dispatch(actionCheckProduct());
  }, [dispatch]);


  return (
    <div className="store">
      <span className="store_intro">Nos meilleurs ventes</span>
      <h3 className="store_title">Commandez dès maintenant !</h3>
      {list.map((product) => (
        <div key={product.id} className="store_product">
          <img src={product.image_url[0]} alt={product.name} />
          <span className="store_product_title">{product.name}</span>
          <span className="store_product_price">A partir de {product.price[0]}€</span>
          <div className="store_product_colors">
            {product.color_code.map((color, index) => (
              <input key={index} type="radio" name={product.name} className="store_product_colors_color" defaultChecked={index === 0} style={{ backgroundColor: color }}></input>
            ))}
          </div>

        </div>
      ))
      }
    </div >
  )
}

export default Store;
