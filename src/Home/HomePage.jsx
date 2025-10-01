import axios from 'axios'
import "./HomePage.css";
import Header from "../Component/Header";
import ProductContainer from "../Component/ProductContainer";
import { useEffect,useState } from 'react';

function HomePage() {
  const [products, setProducts] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:3000/api/products")
  .then((response) => {
    setProducts(response.data);
  })
  },[])
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <Header />
      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return <ProductContainer Product={product} key={product.id} />;
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
