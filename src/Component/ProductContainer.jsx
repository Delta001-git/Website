import './ProductContainer.css'
import { FormatMoney } from '../utils/formatMoney';
import axios from 'axios'
import { useState } from 'react';

function 

ProductContainer({Product,loadCart}) {
  const [quantity,setQuantity] = useState(1);
  //function to add the item in the cart
  const handleAddToCart = async ()=>{
           await axios.post('api/cart-items',{
              productId:Product.id,
              quantity
            })
            await loadCart();
          }

  //function to select item quantiy to the cart 

  const selectQuantity = async (e)=>{
    setQuantity(Number(e.target.value));
  }
  return (
    <>
      <div className="product-container">
        <div className="product-image-container">
          <img
            className="product-image"
            src={Product.image}
          />
        </div>

        <div className="product-name limit-text-to-2-lines">
          {Product.name}
        </div>

        <div className="product-rating-container">
          <img
            className="product-rating-stars"
            src={ `images/ratings/rating-${(Product.rating.stars)*10}.png`}
          />
          <div className="product-rating-count link-primary">{Product.rating.count} </div>
        </div>

        <div className="product-price">{FormatMoney(Product.priceCents)}</div>

        <div className="product-quantity-container">
          <select value={quantity} onChange={selectQuantity} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className="product-spacer"></div>

        <div className="added-to-cart">
          <img src="images/icons/checkmark.png" />
          Added
        </div>

        <button 
          className="add-to-cart-button button-primary"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}

export default ProductContainer;
