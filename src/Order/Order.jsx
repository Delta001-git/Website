import React, { Fragment } from "react";
import "./Order.css";
import Header from "../Component/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { FormatDate } from "../utils/FormatDate";
import { FormatMoney } from "../utils/formatMoney";
import OrderGrid from "./OrderGrid";

function Order({ cart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrderData = async ()=>{
      const response = await axios.get('api/orders?expand=products');
      setOrders(response.data);
    }
    getOrderData();
  }, []);
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrderGrid orders={orders} />
      </div>
    </>
  );
}

export default Order;
