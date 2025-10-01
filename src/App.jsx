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

  useEffect(() => {
    axios.get("http://localhost:3000/api/cart-items").then((response) => {
      setCart(response.data);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage cart = {cart} />} />
        <Route path="/checkout" element={<Checkout cart = {cart} />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="*" element={<UnAuth />} />
      </Routes>
    </>
  );
}

export default App;
