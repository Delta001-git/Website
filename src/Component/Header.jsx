import { useState } from "react";
import "./header.css";
import { Link, NavLink } from "react-router";
import {useNavigate,useSearchParams} from 'react-router'


function Header({ cart }) {
  const [searchPrams] = useSearchParams();

  const searchText = searchPrams.get('search')

  const [search, setSearch] = useState(searchText || '')
  let TotalQuantity = 0;
  cart?.forEach((cartItem) => {
    TotalQuantity += cartItem.quantity;
  });
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo" src="/images/logo-white.png" />
            <img className="mobile-logo" src="/images/mobile-logo-white.png" />
          </Link>
        </div>

        <div className="middle-section">
          <input 
          className="search-bar" 
          type="text"
          placeholder="Search" 
          onChange={(e)=>{
            setSearch(e.target.value)
          }}
          />

          <button 
          className="search-button"
          onClick={()=>{
            navigate(`/?search=${search}`)
          }}
          >
            <img className="search-icon" src="/images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="/images/icons/cart-icon.png" />
            <div className="cart-quantity">{TotalQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
