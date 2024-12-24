import './Store.scss'

import { useAppSelector } from '../../../hooks/redux';
import { Link } from 'react-router-dom';
import ColorRadio from '../ColorRadio/ColorRadio';
import { PriceI } from '../../../@types/product';
import { useState } from 'react';

function Store({ title, subtitle, amount }: { title: string, subtitle: string, type?: string, amount?: number }) {

  const [selectorSelected, setSelectorSelected] = useState<{ [key: string]: number }>({});

  const list = useAppSelector((state) => state.product.list);

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
        {list.map((product, index) => {
          const selectedColorIndex = selectorSelected[product.id] || 0;
          if (amount && index >= amount) return null;
          return (
            <div key={product.id} className="store_list_product">
              {/* <Link to={`/products/${product.id}/${product.name.replace(/\s+/g, '')}`} className="store_list_product_link"> */}
              <Link to={`/products/${product.id}`} className="store_list_product_link">
                <img src={product.image_url[selectedColorIndex]} alt={product.name} className="store_list_product_link_img" />
              </Link>
              <span className="store_list_product_title">{product.name}</span>
              <span className="store_list_product_price">A partir de {minimumPrice(product.Prices)}€</span>
              <div className="store_list_product_colors">
                <ColorRadio selected={selectorSelected[product.id] || 0} setSelected={(selectedColorIndex) => handleColorChange(product.id, selectedColorIndex)} colors={product.color_code} productName={product.name} />
              </div>

            </div>
          )
        })
        }
      </div>

    </div >
  )
}

export default Store;
