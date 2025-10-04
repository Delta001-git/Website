import React, { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./Home/HomePage.jsx";
import { Routes, Route } from "react-router";
import Checkout from "./Checkout/Checkout.jsx";
import Order from "./Order/Order.jsx";
import Tracking from "./Tracking/Tracking.jsx";
import UnAuth from "./Unauth/Unauth.jsx";

function App() {
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };
  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} loadCart={loadCart} />} />
        <Route path="/orders" element={<Order cart={cart} />} />
        <Route
          path={`/tracking/:orderId/:productId`}
          element={<Tracking cart={cart} />}
        />
        <Route path="*" element={<UnAuth />} />
      </Routes>
    </>
  );
}

export default App;
