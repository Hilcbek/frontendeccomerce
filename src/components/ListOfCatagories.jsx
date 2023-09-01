import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Router } from '../../utils/Axios';
import Product from './Product';
import ClipLoader from 'react-spinners/ClipLoader';

const ListOfCatagories = () => {
    let [products,setProducts] = useState([])
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#000");
    let [filters,setFilters] = useState({})
    let [result,setResult] = useState([])
    let location = useLocation().pathname.split("/")[3]
    let [sort,setSort] = useState("newest")
      useEffect(() => {
            let makeRequest = async () => {
            let res = await Router.get(`/product/catagory/${location}`);
            setProducts(res.data.data)
            }
            makeRequest()
        },[])
        let handleClick = (e) => {
            let value = e.target.value
            setFilters({
                ...filters,
                [e.target.name] : value
            })
        }
        useEffect(() => {
            setResult(
                products.filter((item) => 
                    Object.entries(filters).every(([key,value]) => 
                        item[key].includes(value)
                    )
                )
            )
        },[filters])
        useEffect(() => {
            if(sort === "newest"){
                setResult((prev) => 
                    [...prev].sort((a,b) => a.createdAt - b.createdAt)
                )
            }else if(sort === "asc"){
                setResult((prev) => 
                    [...prev].sort((a,b) => a.price - b.price)
                )
            }else{
                setResult((prev) => 
                    [...prev].sort((a,b) => b.price - a.price)
                )
            }
        },[sort])
  return (
    <div className='w-[95%] mx-auto flex items-start justify-start flex-col'>
        <div className='w-full mx-auto flex items-start justify-start flex-col'>
         <h1 className='xs:text-xl font-bold lg:text3 my-3'>Related products of `{<span className='underline text italic text-red-600'>{location}</span>}`</h1>
        <div className='w-full flex xs:items-start xs:flex-col lg:flex-row lg:items-center xs:justify-start lg:justify-between'>
            <div className='flex xs:items-start xs:w-full lg:w-fit xs:flex-col lg:flex-row lg:items-center xs:justify-start lg:justify-between'>
                <h1 className='xs:text-xl lg:text-2xl font-Roboto mr-3 font-light tracking-wider'>Filter Products : </h1>
                <select onChange={handleClick} name="color" id="" className='lg:p-3 xs:p-2 xs:my-2 lg:my-0 xs:w-11/12  border-solid border-black/60 border-[1px] xs:text-sm lg:text-md font-light cursor-pointer mx-3 bg-transparent lg:w-32 flex items-center justify-center text-center'>
                    <option value="yellow">Yellow</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="black">Black</option>
                    <option value="red">Red</option>
                </select>
                <select onChange={handleClick} name="size" id="" className='lg:p-3 xs:p-2 xs:my-2 lg:my-0 xs:w-11/12 border-solid border-black/60 border-[1px] xs:text-sm lg:text-md font-light cursor-pointer mx-3 bg-transparent lg:w-32 flex items-center justify-center text-center'>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </div>
            <div className='flex xs:items-start xs:w-full lg:w-fit xs:flex-col lg:flex-row lg:items-center xs:justify-start lg:justify-between'>
                <h1 className='xs:text-xl lg:text-2xl font-Roboto mr-3 font-light tracking-wide'>Sort Products : </h1>
                <select onChange={(e) => setSort(e.target.value)} name="" id="" className='p-3 xs:my-2 lg:my-0 xs:w-11/12 border-solid border-black/60 border-[1px] text-md font-light cursor-pointer mx-3 bg-transparent lg:w-32 flex items-center justify-center text-center'>
                    <option value="newest">Newest</option>
                    <option value="asc">Price(asc)</option>
                    <option value="desc">Price(desc)</option>
                </select>
            </div>
        </div>
    </div>
       <div className={`${products.length === 0 ? 'flex' : 'grid'} min-h-[60vh] items-center justify-center mx-auto xs:grid-cols-1 md:grid-cols-2 mt-5 lg:grid-cols-5 w-full`}>
             {
                products.length > 0 ? (
                    (!Array.isArray(products) || loading) ?  <ClipLoader color={color} loading={loading} size={180} aria-label="Loading Spinner" data-testid="loader" /> : (result.length > 0 ? result : products).map((product) => (
                        <Product key={product.id} data={product} />
                    ))
                ) : (
                    <div className='flex items-center justify-center'><h1 className='text'>No Search Result!</h1><span className='text-4xl'>😔</span></div>
                )
            }
       </div>
    </div>
  )
}

export default ListOfCatagories