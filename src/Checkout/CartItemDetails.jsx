import React from "react";
import axios from "axios";
import { FormatMoney } from "../utils/formatMoney";

function CartItemDetails({ cartItem, deleteCartItem,loadCart }) {
  const [update, setUpdate] = React.useState(false);
  const [quantity, setQuantity] = React.useState(cartItem.quantity);
  const updateCartItems = async () => {
    setUpdate((prev) => !prev);
    if (update) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
      setUpdate(false);
    }
    
  };
  return (
    <>
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {FormatMoney(cartItem.product.priceCents)}{" "}
        </div>
        <div className="product-quantity">
          {update ? (
            <input
              className="update-items-text"
              onKeyDown={(e)=>{
                if(e.key ==='Enter'){
                  updateCartItems();
                }
                if(e.key ==='Escape'){
                  setQuantity(cartItem.quantity);
                  setUpdate(false)


                }
                
              }}
              type="text"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          ) : (
            <span>
              Quantity:{" "}
              <span className="quantity-label">{cartItem.quantity} </span>
            </span>
          )}

          <span
            className="update-quantity-link link-primary"
            onClick={updateCartItems}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}

export default CartItemDetails;
