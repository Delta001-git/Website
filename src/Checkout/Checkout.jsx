import CheckoutHeader from "./Checkout-Header";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Checkout.css";
import ProductSummary from "./ProductSummary";
import PaymentSummary from "./PaymentSummary";

function Checkout({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState({});

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
    axios
      .get("/api/payment-summary")
      .then((response) => {
        setPaymentSummary(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <div className="checkout-grid">
        <ProductSummary cart={cart} deliveryOptions = {deliveryOptions} />
         <PaymentSummary  paymentSummary={paymentSummary}/>
        </div>
      </div>
    </>
  );
}

export default Checkout;
