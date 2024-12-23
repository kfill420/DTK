import { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import './ProductPage.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import Question from '../Question/Question';
import questions from '../../../data/questions';
import ColorRadio from '../ColorRadio/ColorRadio';
import TextRadio from '../TextRadio/TextRadio';

type ProductPageParams = {
  id: string;
  name: string;
}

function ProductPage() {
  const { id } = useParams<ProductPageParams>();
  const navigate = useNavigate();

  const [colorSelected, setColorSelected] = useState(0);
  const [stateSelected, setStateSelected] = useState(0);
  const [stockageSelected, setStockageSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const list = useAppSelector((state) => state.product.list);
  if (id === null || id === undefined) return navigate('/');
  const product = list.find((product) => product.id === +id);
  console.log(product);

  const stateProduct = ["Imparfait", "Correct", "Très bon", "Parfait"];
  const stockageProduct = ["64Go", "128Go", "256Go", "512Go", "1To"];

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColorSelected(parseInt((event.target.value).slice(-1)));
  }

  const handleStateChange = (index: number) => {
    setStateSelected(index);
  }

  const handleStockageChange = (index: number) => {
    setStockageSelected(index);
  }

  const handleQuantityMenos = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const handleQuantityPlus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (quantity < 5) {
      setQuantity(quantity + 1);
    }
  }

  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoIosStar />);
    }
    for (let i = 0; i < halfStars; i++) {
      stars.push(<IoIosStarHalf />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<IoIosStarOutline />);
    }
    return stars;
  }

  return (
    <div className="product">
      {product === undefined ? <h1>Produit introuvable</h1> :
        <form>
          <div className="product_images">
            <img src={product.image_url[0]} alt="" />
            <div className="product_images_selector">
              {product.image_url.map((image, index) => (
                <img key={index} src={image} alt="image selector color" className="product_images_selector_img" />
              ))}
            </div>
          </div>
          <div className="product_infos">
            <h2>{product.name}</h2>
            <span>{product.price[0]}€</span>
            <div className="product_infos_item">
              <span>Couleur: {product.color_name[colorSelected]}</span>
              <div className="product_colors">
                <ColorRadio colors={product.color_code} productName={product.name} />
              </div>
            </div>

            <div className="product_infos_item">
              <span>Etats: {stateProduct[stateSelected]}</span>
              <TextRadio datas={stateProduct} stateSelected={stateSelected} setSelected={handleStateChange} />
            </div>

            <div>
              <Question title="Quel état choisir ?" content={questions[0].content} />
            </div>

            <div className="product_infos_item">
              <span>Stockage: {stockageProduct[stockageSelected]}</span>
              <TextRadio datas={stockageProduct} stateSelected={stockageSelected} setSelected={handleStockageChange} />
            </div>

            <div className="product_infos_item">
              <span>Quantité:</span>
              <div className="product_infos_item_quantity">
                <button className="product_infos_item_quantity_button" onClick={handleQuantityMenos}><FaMinus /></button>
                <span>{quantity}</span>
                <button className="product_infos_item_quantity_button" onClick={handleQuantityPlus}><FaPlus /></button>
              </div>
            </div>

            <button type="button" className="product_infos_button product_infos_button-submit">Ajouter au panier</button>
            <button type="submit" className="product_infos_button">Acheter maintenant</button>

            <div>
              <Question title="Description de l'article" content={product.description} />
            </div>

            <div className="reviews">
              <span className="reviews_title">Avis des clients</span>
              {product.Reviews ? product.Reviews.map((review) => (
                <div className="reviews_review">
                  <div className="reviews_review_stars">
                    {generateStars(review.rating)}
                  </div>
                  <span className="reviews_review_comment">{review.comment}</span>
                </div>
              )) : <span className="reviews_noreview">Aucun avis</span>}
              <button className="reviews_button">Ajouter un avis</button>
            </div>
          </div>
        </form>
      }

    </div>
  )
}

export default ProductPage;
