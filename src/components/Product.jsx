import React, { useState } from 'react'
import {LiaCartPlusSolid} from 'react-icons/lia'
import {CiSearch} from 'react-icons/ci'
import {Link, useNavigate} from 'react-router-dom'
import { AddProduct } from '../../@Redux/product'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
const Product = ({data,gap,showCart}) => {
    let [src,setSrc] = useState(null)
    let dispatch = useDispatch()
    let handleHover = (e) => {
        setSrc(e.target.getAttribute("src"))
    }  
    let navigate = useNavigate()
    let {username} = useSelector((state) => state.user) 
    let AddToCart = () => {
        if(username?.length > 0 ){
            dispatch(AddProduct({...data, quantity : 1}))
            toast.success('Product added to Cart!')
         }else{
            navigate('/login')
         }
    }
  return (
    <div className={`${gap ? 'xs:w-full xs:h-full lg:w-[276px]' : 'xs:w-full xs:h-full lg:w-[288px]'} shadow-xs shadow-black mt-10 bg-white relative overflow-hidden group cursor-pointer`}>
        <div className='w-full flex items-end justify-start flex-col absolute top-2 -right-9 h-full transition_cubic group-hover:right-2 z-[999]'>
            {showCart && <li onClick={AddToCart} className='w-10 h-10 flex items-center my-[2px] hover:bg-black justify-center hover:bg-black/10 rounded-full cursor-pointer'>
                <LiaCartPlusSolid className={'text-2xl'} />
            </li>}
            <Link to={username ? `/product/${data._id}` : '/login'} className='w-10 h-10 flex items-center my-[2px] hover:bg-black justify-center hover:bg-black/10 rounded-full cursor-pointer'>
                <CiSearch className={'text-2xl'} />
            </Link>
        </div>
        <div className='imagehoderuser w-full h-auto relative  bg-[#ebeef0]'>
            <img src={data.img[0]} className='w-full h-full object-cover' alt="" />
            <p className='absolute bottom-0 text-xs bg-white w-10 left-1 flex items-center justify-center font-Quicksand'>${data.price}</p>
        </div>
        <div className='w-full'>
            <div className='hidden transition_cubic group-hover:grid grid-cols-4 gap-[1px] w-full'>
                {
                    data.img.map((i,idx) => (
                        <div key={idx} className='xs:w-[100%] z-[999] border-solid hover:border-[#2196f3] border-[1px] lg:w-auto m-[1px]'>
                            <img onMouseOver={(e) => handleHover(e)} className='images w-full h-full object-contain' src={i} alt="" />
                        </div>
                    ))
                }
                <div className={`${src ? 'flex' : 'hidden'} z[999] absolute top-0 left-0 w-full items-center justify-center h-[60%]`}>    
                    <img className='w-full h-full object-cover' src={src} alt="" />
                </div>
            </div>
            <div className='font-Roboto shadow-sm shadow-black/20 py-1 font-light text-xs text-black/80'>
                <h1 className='my-1 font-semibold'>{data.title}</h1>
                <p className='my-1'>T-shirt</p>
                <p className='my-1'>3 colors</p>
            </div>
        </div>
    </div>
  )
}

export default Product