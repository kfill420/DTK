import './Store.scss'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import actionCheckProduct from '../../../store/thunks/checkProduct';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ColorRadio from '../ColorRadio/ColorRadio';
import { PriceI } from '../../../@types/product';

function Store({ title, subtitle, type }: { title: string, subtitle: string, type?: string }) {
  const dispatch = useAppDispatch();

  const [selectorSelected, setSelectorSelected] = useState<{ [key: string]: number }>({});

  const list = useAppSelector((state) => state.product.list);

  useEffect(() => {
    dispatch(actionCheckProduct());
  }, [dispatch]);

  const minimumPrice = (list: PriceI[]) => {
    const priceList = list.map((product) => +product.price);
    let price = priceList[0];
    priceList.forEach(product => {
      if (product < price) {
        price = product;
      }
    });
    return price;
  }

  const handleColorChange = (productId: number, selectedColorIndex: number) => {
    setSelectorSelected(prevState => ({
      ...prevState,
      [productId]: selectedColorIndex
    }));
  };

  return (
    <div className="store">
      <div>
        <span className="store_intro">{subtitle}</span>
        <h3 className="store_title">{title}</h3>
      </div>
      <div className="store_list">
        {list.map((product) => (
          <div key={product.id} className="store_list_product">
            <Link to={`/products/${product.name.replace(/\s+/g, '')}/${product.id}`}>
              <img src={product.image_url[0]} alt={product.name} />
            </Link>
            <span className="store_list_product_title">{product.name}</span>
            <span className="store_list_product_price">A partir de {minimumPrice(product.Prices)}€</span>
            <div className="store_list_product_colors">
              <ColorRadio selected={selectorSelected[product.id] || 0} setSelected={(selectedColorIndex) => handleColorChange(product.id, selectedColorIndex)} colors={product.color_code} productName={product.name} />
            </div>

          </div>
        ))
        }
      </div>

    </div >
  )
}

export default Store;
