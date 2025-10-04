import axios from 'axios'
import "./HomePage.css";
import Header from "../Component/Header";
import ProductContainer from "../Component/ProductContainer";
import { useEffect,useState } from 'react';

function HomePage( {cart , loadCart}) {
  const [products, setProducts] = useState([])

   useEffect(() => {
    const getProductsData = async ()=>{
      const response = await axios.get("/api/products")
      setProducts(response.data);
    }
    getProductsData();
  }, []);
  
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <Header cart = {cart}/>
      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return <ProductContainer Product={product} key={product.id} loadCart = {loadCart} />;
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
