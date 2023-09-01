import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { Slide } from '../../utils/Slider'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import Catagories from '../components/Catagories'
import Products from '../components/Products'
import NewSletter from '../components/NewSletter'
import Cart from './Cart'
import { Router } from '../../utils/Axios'
import ClipLoader from 'react-spinners/ClipLoader'
import { useSelector } from 'react-redux'
const Home = () => {
  let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#000");
    let [products,setProducts] = useState([])
    let { username, reload } = useSelector((state) => state.user)
    useEffect(() => {
        setLoading(true)
        let makeApiCall = async () => {
            let res = await Router.get('/product/random');
            res.data.data && setLoading(false)
            setProducts(res.data.data)
        }
        makeApiCall()
    },[])
    let [counter,setCounter] = useState(0)
    let setSign = (sign) => {
        sign === "left" ? setCounter(prev => prev > 0 ? prev - 1 : prev) : setCounter(prev => prev < products.length - 1  ? prev + 1 : 0)
    }
  return (
    <div className='w-full relative'>
        <div className={`${products.length === 0 ? 'items-center justify-center' : 'items-start justify-start'} flex mx-auto w-full h-auto lg:min-h-[80vh] overflow-hidden relative`}>
            <li onClick={() => setSign('left')} className='z-[999] w-10 h-10 flex items-center justify-center absolute xs:top-[23%] lg:top-[40%] left-[2%] cursor-pointer md:hover:bg-black md:hover:text-white bottom-20 border-solid border-black border-[1px]'><BsArrowLeft /></li>
            {
                (!Array.isArray(products) || products.length === 0 || loading)  ? <ClipLoader className='z-[99999]' color={color} loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader" /> :  products.map((slide) => (
                    <Slider key={slide.id} data={slide} style={counter} />
                ))
            }
            <li onClick={() => setSign('right')} className='z-[999] w-10 h-10 flex items-center justify-center absolute right-[2%] xs:top-[23%] lg:top-[40%] cursor-pointer md:hover:bg-black md:hover:text-white bottom-20 border-solid border-black border-[1px]'><BsArrowRight /></li>
        </div>
        <Catagories />
        <Products />
        <NewSletter />
    </div>
  )
}

export default Home