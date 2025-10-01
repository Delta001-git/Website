import React from 'react'
import HomePage from './Home/HomePage.jsx'
import { Routes,Route } from 'react-router'
import Checkout from './Checkout/Checkout.jsx'
import Order from './Order/Order.jsx'
import Tracking from './Tracking/Tracking.jsx'


function App() {
  return (
  <>
  <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/checkout.html' element={<Checkout/>}/>
    <Route path='/orders.html' element={<Order/>} ></Route>
    <Route path='/tracking' element={<Tracking/>} ></Route>
  </Routes>
    
  </>
  )
}

export default App