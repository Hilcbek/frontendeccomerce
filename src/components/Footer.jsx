import React from 'react'
import {Link} from 'react-router-dom'
import { BsEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs'
import { BiCurrentLocation, BiLogoJavascript, BiLogoMongodb } from 'react-icons/bi'
import {FaCss3, FaReact} from 'react-icons/fa'
const Footer = () => {
  return (
    <div className='w-[95%] py-10 mx-auto flex items-center lg:justify-between xs:flex-col lg:flex-row'>
      <div className='w-full'>
        <h1 className='text mb-2'>BABI MART.</h1>
        <p className='font-Poppins font-light text-sm leading-6'>&nbsp;&nbsp;&nbsp;&nbsp;Babi Digital Market stands as a vibrant digital marketplace that caters to the modern consumer's eclectic needs and desires. 
          Our curated collection spans across diverse categories, from fashion to electronics, home essentials to artisanal creations. 
          Whether you seek trendsetting apparel or cutting-edge gadgets, unique handcrafted items or everyday necessities, Babi Digital 
          Market presents a world of possibilities, all conveniently accessible from your digital device.</p>
      </div>
      <div className='w-full flex items-start pl-10 justify-start flex-col'>
        <h1 className='text-4xl underline'>Useful Links</h1>
        <div className='w-full flex items-center justify-center'>
          <div className='flex items-start justify-start font-light flex-col w-full'>
            <Link className='my-1 font-Roboto hover:underline hover:text-[#009866]' to={'/'}>Home</Link>
            <Link className='my-1 font-Roboto hover:underline hover:text-[#009866]' to={'/'}>Man Fashion</Link>
            <Link className='my-1 font-Roboto hover:underline hover:text-[#009866]' to={'/'}>Accessories</Link>
            <Link className='my-1 font-Roboto hover:underline hover:text-[#009866]' to={'/'}>Order Tracking</Link>
          </div>
          <div className='flex items-start justify-start font-light flex-col w-full'>
            <Link className='my-1 font-Roboto hover:underline hover:text-[#009866]' to={'/'}>Wishlist</Link>
            <Link className='my-1 font-Roboto hover:underline hover:text-[#009866]' to={'/'}>Cart</Link>
            <Link className='my-1 font-Roboto hover:underline hover:text-[#009866]' to={'/'}>Women Fashion</Link>
            <Link className='my-1 font-Roboto hover:underline hover:text-[#009866]' to={'/'}>Related Goods</Link>
            <Link className='my-1 font-Roboto hover:underline hover:text-[#009866]' to={'/'}>Terms</Link>
          </div>
        </div>
      </div>
      <ul className='flex items-start justify-start flex-col w-full'>
        <h1 className='text-4xl underline mb-3'>Contact</h1>
        <li className='flex items-center justify-start my-2 font-bold'><BiCurrentLocation className='text-3xl' /><p className='ml-2 font-light text-black/60'>2701, Temenja Yaz, Kirkos Sub-city, Addis Ababa, Ethiopia</p></li>
        <li className='flex items-center justify-start my-2 font-bold'><BsFillTelephoneFill className='text-3xl' /><p className='ml-2 font-light text-black/60'>+251-930-701-626</p></li>
        <li className='flex items-center justify-start my-2 font-bold'><BsEnvelopeFill className='text-3xl' /><p className='ml-2 font-light text-black/60'>balemayehu06@gmail.com</p></li>
        <div className='flex items-end justify-between w-full my-2 bg-black p-2 rounded-md'>
          <FaReact className='text-6xl text-[#61dbfb]' />
          <FaCss3 className='text-6xl text-[#2969b4]' />
          <BiLogoJavascript className='text-6xl text-[#ffe008]' />
            <BiLogoMongodb className='text-6xl text-[#48a13f]' />
        </div>
      </ul>
    </div>
  )
}

export default Footer