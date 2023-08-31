import React, { useEffect, useState } from 'react'
import { productsImage } from '../../utils/Slider'
import Product from './Product'
import { Router } from '../../utils/Axios'
import ClipLoader from 'react-spinners/ClipLoader'
const Products = ({list,gap}) => {
  let [products,setProducts] = useState([])
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#000");
  useEffect(() => {
    let makeRequest = async () => {
      let res = await Router.get('/product');
      setProducts(res.data.data)
    }
    makeRequest()
  },[])
  return (
    <div className={`w-full flex items-center justify-center flex-col`}>
      <h1 className={`${!list ? 'flex' : 'hidden'} text lg:text4 font-Poppins`}>Our Products</h1>
        <div className={`${list ? 'w-full' : 'w-[95%] '} mx-auto grid xs:grid-cols-1 md:grid-cols-2 lg:mt-5 lg:grid-cols-5`}>
          {
            (!Array.isArray(products) || products.length === 0 || loading) ?  <ClipLoader color={color} loading={loading} size={180} aria-label="Loading Spinner" data-testid="loader" /> : products.map((product) => (
                  <Product key={product.id} data={product} gap={list} showCart={true} />
              ))
          }
        </div>
    </div>
  )
}

export default Products