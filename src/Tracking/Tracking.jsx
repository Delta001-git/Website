import "./Tracking.css";
import Header from "../Component/Header";
import { Link } from "react-router";
import { useParams } from "react-router";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { FormatDate } from "../utils/FormatDate";
import dayjs from "dayjs";

function Tracking({ cart }) {
  const [orders, setOrders] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    const getTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrders(response.data);
    };
    getTrackingData();
  }, [orderId]);

  if (!orders) {
    return null;
  }

  // calculate overall progress
  const now = dayjs().valueOf();
  const orderStart = orders.orderTimeMs;
  const estimatedEnd = Math.max(
    ...orders.products.map((p) => p.estimatedDeliveryTimeMs)
  ); // longest delivery

  const totalDeliveryMs = estimatedEnd - orderStart;
  const elapsedMs = now - orderStart;

  let progress = (elapsedMs / totalDeliveryMs) * 100;
  if (progress > 100) progress = 100;
  if (progress < 0) progress = 0;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          {orders.products.map((OrderProduct) => {
            let TotalDeliveryTimeMS =
              OrderProduct.estimatedDeliveryTimeMs - orders.orderTimeMs;

            return (
              <Fragment key={OrderProduct.productId}>
                <div className="delivery-date">
                  Expected: {FormatDate(OrderProduct.estimatedDeliveryTimeMs)}
                </div>
                <div className="product-info">
                  {OrderProduct.product.name}
                </div>
                <div className="product-info">
                  Quantity: {OrderProduct.quantity}
                </div>
                <img
                  className="product-image"
                  src={`/${OrderProduct.product.image}`}
                  alt={OrderProduct.product.name}
                />
              </Fragment>
            );
          })}

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="progress-time">
            {dayjs(orderStart).format("MMM D, HH:mm")} →{" "}
            {dayjs(estimatedEnd).format("MMM D, HH:mm")}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tracking;
