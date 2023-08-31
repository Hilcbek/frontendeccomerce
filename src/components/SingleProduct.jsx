import React, { useEffect, useState } from 'react'
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { Router } from '../../utils/Axios'
import ClipLoader from 'react-spinners/ClipLoader'
import ReactImageMagnify from 'react-image-magnify';
import { AddProduct } from '../../@Redux/ProductReducer'
import { useDispatch, useSelector } from 'react-redux'
const SingleProduct = () => {
    let location = useLocation().pathname.split("/")[2]
        let [product,setProduct] = useState([])
        let [loading, setLoading] = useState(false);
        let [quantity,setQuantity] = useState(1)
        let [color, setColor] = useState("#000");

        let AddColor = (col) => {
            setSelectedColor.push(col)
        }
        let AddSize = (size) => {
            setSelectdSize.push(size)
        }
        let handleQuantity = (sign) => {
            sign === "plus" ? setQuantity((prev) => prev + 1) : setQuantity((prev) => prev > 0 ? prev - 1 : prev)
        }
        let dispatch = useDispatch()
        useEffect(() => {
            let makeRequest = async () => {
            setLoading(true)
            let res = await Router.get(`/product/single/${location}`);
            res.data && setLoading(false)
            setProduct(res.data.data)
            }
            makeRequest()
        },[])
        let setSelectedColor = [product?.color?.[0]]
        let setSelectdSize = [product?.size?.[0]]
        let navigate = useNavigate()
    let AllImages = document.querySelectorAll('.images')
    let [src,setSrc] = useState(null)
    let {username} = useSelector((state) => state.product)
    let handleHover = (e) => {
        setSrc(e.target.getAttribute("src"))
    } 
    let AddToCart = () => {
        if(username?.length > 0 ){
            dispatch(AddProduct({...product, quantity,setSelectdSize,setSelectedColor})) 
        }else{
            navigate('/login')
        }
    }
  return (
    <div className='flex items-center justify-center w-full min-h-[70vh]'>
    {
        (typeof product !== "object" || product.length === 0 || loading) ? <ClipLoader color={color} loading={loading} size={80} aria-label="Loading Spinner" data-testid="loader" /> : 
        <div className='w-11/12 mx-auto flex items-start justify-start py-5 xs:flex-col md:flex-row'>
            <div className='xs:m-1 md:m-0 lg:w-[200px] mx-auto flex items-start justify-start xs:flex-row md:flex-col'>
                {
                    product?.img?.map((img) => (
                        <div className='w-[98%] xssrc:m-1 md:my-1 md:m-0 border-solid hover:border-[#2196f3] border-[1px] cursor-pointer bg-[#ebeef0] my-[1px]'>
                            <img onMouseOver={(e) => handleHover(e)} className='images w-full object-cover' src={img} alt="" />
                        </div>
                    ))
                }
            </div>
            <div className='flex items-start w-full justify-start lg:flex-row xs:flex-col'>
                <div className='w-full bg-[#ebeef0] mr-4'>
                    {/* <img className='w-full h-full object-cover' src={src ? src  : product?.img?.[0]} alt="" /> */}
                    <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src: src ? src  : product?.img?.[0]
                        },
                        largeImage: {
                            src: src ? src  : product?.img?.[0],
                            width: 700,
                            height: 700
                        }
                    }} className='z-[999999999] object-cover' />
                </div>
                <div className='flex items-start w-full justify-start flex-col lg:ml-4'>
                    <h1 className='my-4 font-semibold text-2xl font-Roboto'>{product?.title}</h1>
                    <p className='text-[#2196f3] text-xl font-Poppins font-light  flex items-center justify-center priceAnimate tracking-wider'>${Number(product?.price).toFixed(2)}</p>
                    <p className='my-10 font-light'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{product?.desc}</p>
                    <div className='w-full flex items-center xs:justify-center xs:flex-col lg:flex-row lg:justify-between'>
                    <div className='flex items-center justify-start w-8/12 my-7'>
                        <button onClick={() => handleQuantity('plus')} className='xs:w-40 lg:w-full border-solid font-light bg-[#ebeef0] border-transparent h-12 flex items-center justify-center text-xl'>+</button>
                        <p className='xs:w-40 lg:w-full h-12 font-light text-md flex items-center justify-center'>{quantity}</p>
                        <button onClick={() => handleQuantity('minus')} className='xs:w-40 lg:w-full border-solid font-light bg-[#ebeef0] border-transparent h-12 flex items-center justify-center text-xl'>-</button>
                    </div>
                        <ul className='w-full flex items-center justify-start'>
                            <p className='my-4 font-light text-xl font-Quicksand w-5/12 mx-2'>Colors:</p>
                            <div className='w-11/12 flex items-center max-h-[100px] overflow-y-scroll justify-start flex-wrap'>
                                {
                                    product?.color?.map((col) => (
                                        <li onClick={() => AddColor(col)} className='cursor-pointer scale-100 hover:scale-105 transition_cubic w-8 m-2 mx-2 rounded-full before:rounded-full h-8 relative before:absolute before:-left-1 before:-top-1 before:w-10 before:h-10 before:content-[""] before:border-solid before:border-[1px] before:border-black' style={{ backgroundColor : col}}></li>
                                    ))
                                }
                            </div>
                        </ul>
                        <div className='w-full flex items-center justify-center'>
                            <select name="" id="" className='p-3 border-solid border-black/60 border-[1px] text-md font-light cursor-pointer mx-3 bg-transparent xs:w-11/12 xs:my-2 lg:my-0 lg:w-32 flex items-center justify-center text-center'>
                                {
                                    product?.size?.map((size) => (
                                        <option onChange={(e) => AddSize(e.target.value)} value={size}>{size}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <button onClick={AddToCart} className='p-3 xs:my-2 lg:my-0 tracking-wider relative xs:w-11/12 xs:mx-auto lg:mx-0 lg:w-56 flex items-center justify-center overflow-hidden group bg-[#2196f3] text-white px-2 transition_cubic'><MdOutlineAddShoppingCart className='mr-1 transition_cubic rotate-[360deg] group-hover:rotate-0 group-hover:left-28' /><p className='text-sm'>Add To Cart</p></button>
                </div>
            </div>
        </div>
    }
    </div>
  )
}

export default SingleProduct