import React, { useEffect, useState } from 'react'
import {MdDelete} from 'react-icons/md'
import StripeCheckout from 'react-stripe-checkout';
import { FaAmazonPay } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Add, DeleteProduct, Reset, Subtructe } from '../../@Redux/product'
import { Link, useNavigate } from 'react-router-dom'
import { Router } from '../../utils/Axios';
import { BsArrowLeft } from 'react-icons/bs';
import { toast } from 'react-toastify';
const Cart = () => {
    let {Total} = useSelector((state) => state.product)
    let {username} = useSelector((state) => state.user)
    let [stripe,setStripe] = useState(null)
    let onToken = (token) => {
        setStripe(token)
    }
    let navigate = useNavigate()
    useEffect(() => {
        let makeRequest = async () => {
            let res = await Router.post('/pay',{
                tokenId : stripe.id,
                amount : Total * 100,

            })
            dispatch(Reset({}))
            navigate('/pay',{ data : res.data})
            ResetMe()
        }
        makeRequest()
    },[stripe])
    let ResetMe = () => {
         setTimeout(() =>{
                navigate('/')
        },4000)
    }
    let [show,setShow] =  useState(false)
    let { products } = useSelector((state) => state.product)
    let dispatch = useDispatch()
    let handleQuantity = (sign,id) => {
        if(sign === "plus"){ 
            let result = Array.from(products).find((pro) => pro._id === id)
            dispatch(Add({ id : id }))

        }else{
            let result = Array.from(products).find((pro) => pro._id === id)
            dispatch(Subtructe({ id : id }))
        }
         
    }
    let SendDelete = (id) => {
        dispatch(DeleteProduct({ id : id }))
        toast.info('Product remove from your Cart!')
    }
    let Resetter = () => {
        dispatch(Reset({}))
         toast.info('Your cart is cleared!')
    }
  return (
    <div className='w-11/12 mx-auto'>
        <div className='w-full flex xs:items-start my-5 xs:justify-start lg:items-center lg:justify-between lg:flex-row xs:flex-col'>
            <Link to={'/'}  className='text w-10 h-10 flex items-center justify-center border-solid border-black/10 hover:border-[1px] rounded-full hover:bg-black/20'><BsArrowLeft className='text-xl cursor-pointer z-[9999]' /></Link>
            <h1 className='font-Roboto m-1 mb-4 text-2xl text-black/90'>Products in your cart</h1>
        </div>
        <div className='flex items-start justify-start flex-col w-full'>
            {
                products.length > 0 ?  (
                    products?.map((pro) => (
                    <div className='flex items-start justify-start lg:flex-row xs:flex-col w-full my-1'>
                            <div className='xs:w-full lg:w-3/12 border-solid border-[#2196f3] border-[1px]'>
                                <img src={pro.img[0]} alt="" />
                            </div>
                            <div className='xs:w-full lg:w-8/12 mx-auto flex items-start justify-start flex-col'>
                                <h1 className='font-Roboto text-md font-bold text-black/90'>{pro?.title}</h1>
                                <p className='my-[1px] font-Roboto text-xs font-light text-black/90 xs:w-full lg:w-9/12'>{show ? pro?.desc : String(pro?.desc).substring(0,400).concat('...')}<span onClick={() => setShow(!show)} className='text-[#2196f3] italic hover:underline cursor-pointer'>{show ? 'show less' : 'show more'}</span></p>
                                <div className='flex items-center justify-between w-full my-2'>
                                    <p className='text-[#2196f3] my-[1px] font-Roboto text-xs font-bold'>{Number(pro?.quantity) + 'X' + (pro?.price).toFixed(2)}</p>
                                    <div className='flex items-center justify-start'>
                                        <button onClick={() => handleQuantity('plus',pro._id)} className='xs:w-10 border-solid border-[1px] hover:border-[#2196f3] font-light bg-[#ebeef0] h-10 flex items-center justify-center text-xl'>+</button>
                                        <p className='xs:w-10 h-10 font-light text-xs flex items-center justify-center'>{pro?.quantity}</p>
                                        <button onClick={() => handleQuantity('minus',pro._id)} className='xs:w-10 border-solid border-[1px] hover:border-[#2196f3] font-light bg-[#ebeef0] h-10 flex items-center justify-center text-xl'>-</button>
                                    </div>
                                </div>
                            </div>
                            <li onClick={() => SendDelete(pro?._id)} className='hover:text-red-600 xs:mx-auto lg:mx-0 list-none cursor-pointer flex items-center justify-center w-20 h-20 rounded-full lg:hover:bg-black/10 border-solid hover:border-black/20 border-[1px]'><MdDelete className='text-3xl' /></li>
                        </div>
                    ))
                ) : (
                    <h1 className='text text-center w-full my-5'>Your Cart is Empty!</h1>
                )
            }
        </div>
        <div className='font-Quicksand flex items-center justify-between w-11/12 xs:mx-auto my-5'>
            <h1 className='font-semibold'>Subtotal</h1>
            <p className='text-xs font-bold'>${Total > 0 ? Number(Total).toFixed(2) : Number(0).toFixed(2)}</p>
        </div>
        <StripeCheckout 
            name={username}
            description={`Your total amount is ${Number(Total).toFixed(2)}`}
            image='https://assets.iocea.com/assets/Product%20Logos/Logo1-01.png'
            billingAddress
            shippingAddress
            amount={Number(Total * 100).toFixed(2)}
            token={onToken}
            stripeKey={import.meta.env.VITE_STRIPE_PAYMENT_PUBLIC_API}
            >
             <button disabled={!username || !Total} className='p-2 xs:my-3 lg:my-5 tracking-wider relative xs:w-11/12 xs:mx-auto flex items-center justify-center overflow-hidden group bg-[#2196f3] text-white px-2 transition_cubic'><FaAmazonPay className='mr-1 transition_cubic rotate-[360deg] group-hover:rotate-0 group-hover:left-28' /><p className='text-sm'>Checout</p></button>
        </StripeCheckout>
        <button onClick={Resetter} className='p-2 hover:bg-red-600 hover:text-white xs:my-3 lg:my-5 tracking-wider relative xs:w-11/12 xs:mx-auto border-solid border-red-600 border-[1px] text-sm flex items-center justify-center overflow-hidden group text-red-600 px-2'>Reset</button>
        <p className='w-full text-red-800 font-bold font-Roboto text-xl text-center'>Use this demo Card Number for Security <p>4242 4242 4242 4242</p></p>
    </div>
  )
}

export default Cart