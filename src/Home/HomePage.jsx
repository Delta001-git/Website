import axios from 'axios'
import "./HomePage.css";
import Header from "../Component/Header";
import ProductContainer from "../Component/ProductContainer";
import { useEffect,useState } from 'react';
import { useSearchParams } from 'react-router';

function HomePage( {cart , loadCart}) {
  const [products, setProducts] = useState([])
  window.axios = axios;
  const [searchPrams] = useSearchParams();
  const search = searchPrams.get('search')
   useEffect(() => {
    const getProductsData = async ()=>{
      //const response = await axios.get(`/api/products`)
      const urlPath = search ? `/api/products?search=${search}` : `/api/products`;
      const response = await axios.get(urlPath)
      setProducts(response.data);
    }
    getProductsData();

  }, [search]);
  
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
