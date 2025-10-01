import React from 'react'
import HomePage from './Home/HomePage.jsx'
import { Routes,Route } from 'react-router'
import Checkout from './Checkout/Checkout.jsx'
import Order from './Order/Order.jsx'
import Tracking from './Tracking/Tracking.jsx'
import UnAuth from './Unauth/Unauth.jsx'


function App() {
  return (
  <>
  <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/checkout' element={<Checkout/>}/>
    <Route path='/orders' element={<Order/>} />
    <Route path='/tracking' element={<Tracking/>} />
    <Route path='*' element={<UnAuth/>}/>
  </Routes>
    
  </>
  )
}

export default App