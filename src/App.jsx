import React from "react"
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import SingleProduct from "./components/SingleProduct"
import Register from "./components/Register"
import Login from "./components/Login"
import Payment from "./pages/Payment"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux"
import ListOfCatagories from "./components/ListOfCatagories"
import Cart from "./pages/Cart"
function App() {
  let {profile,reload} = useSelector((state) => state.user)
  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        <Nav/>
        <ToastContainer position="top-right" autoClose={5000} pauseOnHover={true} draggable={true} className={'xs:mt-12 lg:mt-30'} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={(profile || reload) ? <SingleProduct /> : <Navigate to={'/login'} />} />
          <Route path="/pay" element={(profile || reload) ? <Payment /> : <Navigate to={'/login'} />} />
          <Route path="/register" element={(profile && reload) ? <Navigate to={'/'} /> : <Register />} />
          <Route path="/login" element={(profile && reload )  ? <Navigate to={'/'} /> : <Login />} />
          <Route path="/login" element={(profile && reload )  ? <Navigate to={'/'} /> : <Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/RelatedProducts/:cat" element={<ListOfCatagories />} />
        </Routes>
        {(profile && reload) && <Footer />}
      </BrowserRouter>
    </div>
  )
}

export default App
