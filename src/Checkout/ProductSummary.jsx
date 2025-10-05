import { FormatDate } from "../utils/FormatDate";
import { FormatMoney } from "../utils/formatMoney";
import axios from 'axios'
import CartItemDetails from "./CartItemDetails";

function ProductSummary({cart,deliveryOptions,loadCart}) {
  
  return (
    <>
          <div className="order-summary">
            {deliveryOptions.length > 0 &&
              cart.map((cartItem) => {
                const selectedDeliveryOptions = deliveryOptions.find(
                  (deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId;
                  }
                );
                const deleteCartItem = async ()=>{
                    await axios.delete(`api/cart-items/${cartItem.productId}`);
                    loadCart();
                  }
                return (
                  <div key={cartItem.productId} className="cart-item-container">
                    <div className="delivery-date">
                      Delivery date:{" "}
                      {FormatDate(
                        selectedDeliveryOptions.estimatedDeliveryTimeMs
                      )}
                    </div>

                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={cartItem.product.image}
                      />
                      <CartItemDetails 
                        cartItem={cartItem}
                        deleteCartItem={deleteCartItem}
                        loadCart = {loadCart}
                      />
                      
                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryOptions.map((deliveryOption) => {

                          let priceString = "FREE Shipping";
                          if (deliveryOption.priceCents > 0) {
                            priceString = `${FormatMoney(
                              deliveryOption.priceCents
                            )}-Shipping`;
                          }
                           const updateDeliveryOption = async ()=>{
                              await axios.put(`api/cart-items/${cartItem.productId}`,{
                                deliveryOptionId : deliveryOption.id
                              });
                              loadCart();
                           }
                          return (
                            <div
                              key={deliveryOption.id}
                              className="delivery-option"
                              onClick={updateDeliveryOption}
                            >
                              <input
                                type="radio"
                                checked={
                                  deliveryOption.id ===
                                  cartItem.deliveryOptionId
                                }
                                onChange={()=>{}}
                                className="delivery-option-input"
                                name={`delivery-option-1${cartItem.productId}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {FormatDate(
                                    deliveryOption.estimatedDeliveryTimeMs
                                  )}
                                </div>
                                <div className="delivery-option-price">
                                  {priceString}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
    </>
  )
}

export default ProductSummary