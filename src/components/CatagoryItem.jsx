import React from 'react'
import {HiExternalLink} from 'react-icons/hi'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom' 
const CatagoryItem = ({data,data2}) => {
  let {username} = useSelector((state) => state.user)
  let handleTop = () => {
    window.scrollTo({
      top : 0,
      left : 0
    })
  }
  return (
    <div className='relative group overflow-hidden w-full lg:my-3 xs:my-2 shadow-md shadow-black/60 flex items-center justify-center flex-col'>
        <div className='w-full h-full'>
            <img className='w-full h-full object-cover' src={data2?.img[0]} alt="" />
        </div>
        {
          data?.map((cat) => (
              <Link onClick={() => handleTop()} to={username ? `/product/RelatedProducts/${cat}` : '/login'} className='md:absolute transition_cubic text-3xl font-light tracking-widest flex items-center justify-center p-3 bg-black/80 w-11/12 rounded-md cursor-pointer text-white my-3 button scale-100 z-[999]'>{cat} <HiExternalLink className={'ml-2'} /></Link>
          ))
        }
    </div>
  )
}

export default CatagoryItem