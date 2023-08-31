import React, { useEffect, useState } from 'react'
import {MdDelete} from 'react-icons/md'
import StripeCheckout from 'react-stripe-checkout';
import {GrClose} from 'react-icons/gr'
import { FaAmazonPay } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Add, CloseCart, DeleteProduct, Reset, Subtructe } from '../../@Redux/product'
import { useNavigate } from 'react-router-dom'
import { Router } from '../../utils/Axios';
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
    // let [quantity,setQuantity] = useState(1)
    let Close = () => {
        dispatch(CloseCart({}))
    }
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
    }
    let Resetter = () => {
        dispatch(Reset({}))
    }
  return (
    <div className='fixed first top-[48px] xs:max-h-full lg:max-h-[50%] h-auto overflow-y-scroll lg:right-1 bg-white p-2 shadow-sm shadow-black xs:w-full lg:w-3/12 z-[999999999999]'>
        <div className='w-full flex items-center justify-between'>
            <h1 className='font-Roboto m-1 mb-4 text-2xl text-black/90'>Products in your cart</h1>
            <li onClick={Close} className='w-10 h-10 flex items-center justify-center fixed right-6 rounded-full hover:bg-black/20'><GrClose className='text-xl cursor-pointer z-[9999]' /></li>
        </div>
        <div className='flex items-start justify-start flex-col w-full'>
            {
                products?.map((pro) => (
                    <div className='flex items-start justify-start w-full my-1'>
                        <div className='w-3/12'>
                            <img src={pro.img[0]} alt="" />
                        </div>
                        <div className='mx-1 w-11/12 flex items-start justify-start flex-col'>
                            <h1 className='font-Roboto text-md font-bold text-black/90'>{pro?.title}</h1>
                            <p className='my-[1px] font-Roboto text-xs font-light text-black/90'>{show ? pro?.desc : String(pro?.desc).substring(0,100).concat('...')}<span onClick={() => setShow(!show)} className='text-[#2196f3] italic hover:underline cursor-pointer'>{show ? 'show less' : 'show more'}</span></p>
                            <div className='flex items-center justify-between w-full'>
                                <p className='text-[#2196f3] my-[1px] font-Roboto text-xs font-bold'>{Number(pro?.quantity) + 'X' + (pro?.price).toFixed(2)}</p>
                                <div className='flex items-center justify-start'>
                                    <button onClick={() => handleQuantity('plus',pro._id)} className='xs:w-5 border-solid border-[1px] hover:border-[#2196f3] font-light bg-[#ebeef0] h-5 flex items-center justify-center text-xl'>+</button>
                                    <p className='xs:w-5 h-5 font-light text-xs flex items-center justify-center'>{pro?.quantity}</p>
                                    <button onClick={() => handleQuantity('minus',pro._id)} className='xs:w-5 border-solid border-[1px] hover:border-[#2196f3] font-light bg-[#ebeef0] h-5 flex items-center justify-center text-xl'>-</button>
                                </div>
                            </div>
                        </div>
                        <li onClick={() => SendDelete(pro?._id)} className='hover:text-red-600 list-none cursor-pointer flex items-center justify-center w-10 h-10 rounded-full lg:hover:bg-black/30'><MdDelete /></li>
                    </div>
                ))
            }
        </div>
        <div className='font-Quicksand flex items-center justify-between w-11/12 xs:mx-auto my-5'>
            <h1 className='font-semibold'>Subtotal</h1>
            <p className='text-xs'>${Total > 0 ? Number(Total).toFixed(2) : Number(0).toFixed(2)}</p>
        </div>
        <StripeCheckout 
            name={username}
            description={`Your total amount is ${Total}`}
            image='../../public/images/logo.png'
            billingAddress
            shippingAddress
            amount={Total}
            token={onToken}
            stripeKey={import.meta.env.VITE_STRIPE_PAYMENT_PUBLIC_API}
            >
             <button className='p-2 xs:my-3 lg:my-5 tracking-wider relative xs:w-11/12 xs:mx-auto flex items-center justify-center overflow-hidden group bg-[#2196f3] text-white px-2 transition_cubic'><FaAmazonPay className='mr-1 transition_cubic rotate-[360deg] group-hover:rotate-0 group-hover:left-28' /><p className='text-sm'>Checout</p></button>
        </StripeCheckout>
        <button onClick={Resetter} className='p-2 xs:my-3 lg:my-5 tracking-wider relative xs:w-11/12 xs:mx-auto border-solid border-red-600 border-[1px] text-sm flex items-center justify-center overflow-hidden group text-red-600 px-2 transition_cubic'>Reset</button>
    </div>
  )
}

export default Cart