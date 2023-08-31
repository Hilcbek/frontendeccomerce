import React, { useEffect, useState } from 'react'

import { Router } from '../../utils/Axios';
import { useSelector } from 'react-redux'; 
const Payment = () => {
    let {username} = useSelector((state) => state.user)
  return (
    <div className='min-h-[70vh] p-20'>
        <div className='w-11/12 mx-auto relative'>
            <img className='w-full h-full object-cover mix-blend-overlay' src={'../../public/images/Paid.gif'} alt="" />
            <h1 className='absolute top-[20%] text6 xs:-left-14 lg:left-[40%]'>{username}!</h1>
        </div>
    </div>
  )
}

export default Payment