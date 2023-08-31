import React, { useEffect, useState } from 'react'
import { Catagory } from '../../utils/Slider'
import CatagoryItem from './CatagoryItem'
import { Router } from '../../utils/Axios'
import ClipLoader from 'react-spinners/ClipLoader'
const Catagories = () => {
    let [products,setProducts] = useState([])
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#000");
    useEffect(() => {
      let makeRequest = async () => {
        setLoading(true)
        let res = await Router.get('/product');
        setProducts(res.data.data)
        res.data.data && setLoading(false)
      }
      makeRequest()
    },[]) 
  return (
    <div className={`${products.length === 0 ? 'min-h-[60vh] flex items-center justify-center flex-col' : 'xs:columns-1 lg:columns-3 gap-3'} w-[95%] mx-auto`}>
        <h1 className='ml-5 text-5xl underline font-Poppins text2'>Our Popular Catagories : </h1>
        {
            (!Array.isArray(products) || products.length === 0 || loading) ?  <ClipLoader color={color} loading={loading} size={80} aria-label="Loading Spinner" data-testid="loader" /> :  products?.map((cat,idx) => (
                <CatagoryItem key={idx} data={cat?.catagories} data2={cat} />
            ))
        }
    </div>
  )
}
//catagories

export default Catagories