import './Collection.scss'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Link } from 'react-router-dom';
import ColorRadio from '../ColorRadio/ColorRadio';
import { PriceI } from '../../../@types/product';
import { useEffect, useState } from 'react';
import { actionCheckProduct } from '../../../store/thunks/checkProduct';

function Collection({ brand, amount }: { brand?: string, amount?: number }) {
  const dispatch = useAppDispatch();
  const [selectorSelected, setSelectorSelected] = useState<{ [key: string]: number }>({});

  const list = useAppSelector((state) => state.product.list);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(actionCheckProduct());
    }
  }, [dispatch, list.length]);
  console.log(list);

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
    <div className="collection">
      {list.map((product, index) => {
        const selectedColorIndex = selectorSelected[product.id] || 0;
        if (amount && index >= amount) return null;
        return (
          <div key={product.id} className="collection_product">
            <Link to={`/products/${product.id}`} className="collection_product_link">
              <img src={product.image_url[selectedColorIndex]} alt={product.name} className="collection_product_link_img" />
            </Link>
            <span className="collection_product_title">{product.name}</span>
            <span className="collection_product_price">A partir de {minimumPrice(product.Prices)}€</span>
            <div className="collection_product_colors">
              <ColorRadio selected={selectorSelected[product.id] || 0} setSelected={(selectedColorIndex) => handleColorChange(product.id, selectedColorIndex)} colors={product.color_code} productName={product.name} />
            </div>

          </div>
        )
      })
      }
    </div>
  )
}

export default Collection;
