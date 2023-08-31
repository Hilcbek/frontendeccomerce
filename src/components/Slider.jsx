import React, { useState } from 'react'
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { AddProduct } from '../../@Redux/product'
import {Navigate, useNavigate} from 'react-router-dom'
const Slider = ({data,style}) => {
    let [quantity,setQuantity] = useState(1)
    let setSelectedColor = [data.color[0]]
    let setSelectdSize = [data.size[0]]
    let {username} = useSelector((state) => state.user)
    let handleQuantity = (sign) => {
        sign === "plus" ? setQuantity((prev) => prev + 1) : setQuantity((prev) => prev > 0 ? prev - 1 : prev)
    }
    let navigate = useNavigate()
    let AddColor = (col) => {
        setSelectedColor.push(col)
    }
    let AddSize = (size) => {
        setSelectdSize.push(size)
    }
    let dispatch = useDispatch()
    let AddToCart = () => {
        username.length !== 0 ? dispatch(AddProduct({...data, quantity,setSelectdSize,setSelectedColor})) : navigate('/login')
    }
  return (
    <div className='flex transition_cubic w-full lg:slide lg:p-4 items-start lg:flex-row xs:flex-col justify-start font-Roboto' style={{ transform : `translateX(${style * -100}vw)`}}>
        <div className='w-screen h-full lg:mr-5'>
            <img className='w-full h-full object-cover' src={data.img[0]} alt="" />
        </div>
        <div className='xs:w-[95%] lg:w-full xs:mx-auto lg:mx-0 lg:ml-5'>
            <h1 className='my-5 font-extralight text-3xl font-Quicksand'>{data.title}</h1>
            <p className='lg:my-10 text-[red] text-xl font-Poppins font-light  flex items-center justify-center priceAnimate2 tracking-wider'>${Number(data.price).toFixed(2)}</p>
            <p className='lg:my-14 xs:mt-8 lg:mt-0 xs:font-normal lg:font-extralight xs:w-full lg:w-10/12'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.desc}</p>
            <div className='w-full flex items-center xs:justify-center xs:flex-col lg:flex-row lg:justify-between'>
                <div className='flex items-start justify-start w-fit mr-4 lg:my-10'>
                    <div className='xs:w-fit xs:mx-auto lg:mx-0 flex items-center justify-center xs:my-2 lg:my-8'>
                            <button onClick={() => handleQuantity('plus')} className='w-10 border-solid font-light bg-[#ebeef0] border-[.5px] border-[#2196f3] h-10 flex items-center justify-center text-xl'>+</button>
                            <p className='w-12 h-12 font-extralight text-md flex items-center justify-center'>{quantity}</p>
                            <button onClick={() => handleQuantity('minus')} className='w-10 border-solid font-light bg-[#ebeef0] border-[.5px] border-[#2196f3] h-10 flex items-center justify-center text-xl'>-</button>
                    </div>
                </div>
                <ul className='w-full flex items-center justify-start'>
                        <p className='lg:my-4 font-light text-xl font-Quicksand w-3/12'>Colors:</p>
                        <div className='w-11/12 max-h-[290px] overflow-y-scroll flex items-start justify-start flex-wrap'>
                            {
                                data?.color?.map((col) => (
                                    <li onClick={() => AddColor(col)} className='cursor-pointer scale-100 hover:scale-105 transition_cubic w-8 m-2 mx-2 rounded-full before:rounded-full h-8 relative before:absolute before:-left-1 before:-top-1 before:w-10 before:h-10 before:content-[""] before:border-solid before:border-[1px] before:border-black' style={{ backgroundColor : col}}></li>
                                ))
                            }
                        </div>
                </ul>
                <div className='w-6/12 flex items-center justify-center'>
                        <select onChange={(e) => AddSize(e.target.value)} name="" id="" className='p-3 border-solid font-Roboto border-black/60 border-[1px] text-md font-light cursor-pointer mx-3 bg-transparent xs:w-11/12 xs:my-2 lg:my-0 lg:w-32 flex items-center justify-center text-center'>
                            {
                                data?.size?.map((size) => (
                                    <option value={size}>{size}</option>
                                ))
                            }
                        </select>
                </div>
            </div>
                <button onClick={AddToCart} className='p-3 xs:my-2 lg:my-5 tracking-wider relative xs:w-11/12 xs:mx-auto lg:mx-0 lg:w-56 flex items-center justify-center overflow-hidden group bg-[#2196f3] text-white px-2 transition_cubic'><MdOutlineAddShoppingCart className='mr-1 transition_cubic rotate-[360deg] group-hover:rotate-0 group-hover:left-28' /><p className='text-sm'>Add To Cart</p></button>
        </div>
    </div>
  )
}

export default Slider