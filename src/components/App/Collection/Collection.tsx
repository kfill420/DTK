import './Collection.scss'

import { Link } from 'react-router-dom';
import ColorRadio from '../ColorRadio/ColorRadio';
import { PriceI, ProductI } from '../../../@types/product';
import { useState } from 'react';

function Collection({ list, amount, minPrice, maxPrice }: { list?: ProductI[], amount?: number, minPrice?: number, maxPrice?: number }) {
  const [selectorSelected, setSelectorSelected] = useState<{ [key: string]: number }>({});

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
      {list && list.map((product, index) => {
        const selectedColorIndex = selectorSelected[product.id] || 0;
        if (amount && index >= amount) return null;
        if (minPrice && minimumPrice(product.Prices) < minPrice) return null;
        if (maxPrice && minimumPrice(product.Prices) > maxPrice) return null;
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