import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FaUserCircle} from 'react-icons/fa'
import {BsDoorOpenFill} from 'react-icons/bs'
import {BiSolidCartAlt} from 'react-icons/bi'
import {ImExit} from 'react-icons/im'
import {AiOutlineMenu} from 'react-icons/ai'
import {IoCloseOutline} from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Router } from '../../utils/Axios'
import { LOGOUT } from '../../@Redux/userReducer'
import { Reset } from '../../@Redux/product'
window.onload = () => {
  // let res = await axios
}
const Nav = () => {
  let [scroll,setScroll] = useState(false)
  let Scroller = () => window.scrollY >= 100 ? setScroll(true) : setScroll(false)
  window.addEventListener('scroll',Scroller)
  let dispatch = useDispatch()
  let [show,setShow] = useState(false)
  let user = false
  let {profile, reload } = useSelector((state) => state.user)
  let navigate = useNavigate()
  let Logout = () => {
    Router.post('/auth/logout');
    navigate('/')
    dispatch(LOGOUT({}),Reset({}))
  }
  let {quantity} = useSelector((state) => state.product)
  return (
    <nav className={`${scroll ? 'fixed top-0 left-0 w-full bg-white shadow-md shadow-black/50 py-1' : 'static' } z-[9999] mx-auto`}>
      <div className='flex items-center justify-between w-11/12 mx-auto py-1'>
        <div className={`${scroll ? 'hidden' : 'flex w-full'} items-center justify-start`}>
          <Link to={'/'} className={`flex items-center justify-start relative overflow-hidden lg:w-6/12`}>
            <h1 className={`${scroll && 'text'} xs:text-2xl lg:text-4xl font-Pacifico`}>Babi Mart</h1>
            <Link to={'/'} className={`${scroll ? 'left-44' : '-left-12'} transition-cuibc w-12 absolute`}>
              <img src="../../public/images/logo.png" alt="" />
            </Link>
          </Link>
          <input type="search" className='ml-2 xs:hidden  rounded-3xl border-solid p-[12px] my-2 xs:w-full lg:w-10/12 border-black/50 border-[1.5px] pl-4 text-sm outline-none' placeholder='Search any item...' />
        </div>
        <ul className={`${scroll ? 'items-center justify-start' : 'items-center justify-center'} w-full lg:flex xs:hidden`}>
          <h1 className={`${scroll ? 'font-Pacifico' : 'font-Roboto'} font-bold text-4xl text3`}>Amazonica.</h1>
        </ul>
        <ul className='lg:flex xs:hidden items-center justify-end w-full'>
         {
          (profile && reload) ? 
          <>
            <Link to={'/cart'} className='mx-1 rounded-full bg-black text-white w-10 h-10 flex items-center justify-center relative'><BiSolidCartAlt className={`${quantity ? 'relative ' : 'absolute -left-20'} text-md transition_cubic`} /><p className={`${quantity === 0 ? 'text-black' : 'text-[#2196f3]'} flex items-center justify-center bg-white text-black rounded-full w-5 h-5 text-sm font-bold`}>{quantity}</p></Link>
            <div className='w-12 h-12 border-solid border-black/50 border-[1px] p-[1px] rounded-full'><img className='w-full h-full object-cover rounded-full' src={profile} alt="" /></div>
            <button onClick={Logout} className='mx-1 border-solid border-black/50 p-2 bg-black text-white rounded-3xl px-2 text-sm border-[1px] flex items-center justify-center'><ImExit className={'mr-1'} />Logout</button>
          </> : <>
            <Link to={'/register'} className='mx-1 border-solid border-black/50 p-2 bg-black text-white rounded-3xl px-2 text-sm border-[1px] flex items-center justify-start'><FaUserCircle className='mr-1' />Register</Link>
            <Link to={'/login'} className='mx-1 border-solid border-black/50 p-2 bg-black text-white rounded-3xl px-2 text-sm border-[1px] flex items-center justify-start'><BsDoorOpenFill className='mr-1'/>Login</Link>
          </>
         }
        </ul>
        <Link to={'/cart'} className={`${scroll ? 'w-12 h-12' : 'w-16 h-11'} my-2 text-center border-solid border-black/50 bg-black text-white rounded-full text-sm border-[1px] lg:hidden xs:flex items-center justify-center`}><BiSolidCartAlt className='text-md' /><p className={`${quantity === 0 ? 'text-black' : 'text-[#2196f3]'} flex items-center justify-center bg-white rounded-full w-5 h-5 text-sm font-bold`}>{quantity}</p></Link>
        <li onClick={() => setShow(!show)} className='xs:flex items-center justify-center relative z-[99999999999] lg:hidden ml-1 w-16 h-10 flex hover:bg-black/40 cursor-pointer rounded-full'>
          {show ? <IoCloseOutline className='text-xl' /> : <AiOutlineMenu className='text-xl' />}
        </li>
      </div>
      <div className={`${show ? ' right-0' : ' right-[-110%]'} transition_cubic fixed h-full w-full bg-white z-[999999988] top-0`}>
          <ul className='w-full flex items-center justify-center mt-14'>
            <h1 className={`${scroll ? 'font-Pacifico' : 'font-Roboto'} font-bold text-4xl text3`}>Amazonica.</h1>
          </ul>
          <div className='z-[9999999] bg-white w-full my-2 flex items-start flex-col justify-start'>
            <input type="search" className='rounded-3xl border-solid p-[12px] my-2 xs:w-10/12 mx-auto lg:w-10/12 border-black/50 border-[1.5px] pl-4 text-sm outline-none' placeholder='Search any item...' />
            </div>
          <ul className='flex items-center justify-start w-full flex-col'>
            {
              (profile && reload) ? 
              <>
                <div className='w-12 h-12 rounded-full'><img className='w-full h-full object-cover rounded-full' src={profile} alt="" /></div>
                <button onClick={() => {Logout(); setShow(!show)}} className='my-2 w-10/12 text-center border-solid border-black/50 bg-black text-white rounded-3xl p-4 text-sm border-[1px] flex items-center justify-center'><ImExit className={'mr-1'} />Logout</button>
              </> : <>
              <Link onClick={() => setShow(!show)} to={'/register'} className='my-2 w-10/12 text-center border-solid border-black/50 bg-black text-white rounded-3xl p-4 text-sm border-[1px] flex items-center justify-center'><FaUserCircle className='mr-1' />Register</Link>
              <Link onClick={() => setShow(!show)} to={'/login'} className='my-2 w-10/12 text-center border-solid border-black/50 bg-black text-white rounded-3xl p-4 text-sm border-[1px] flex items-center justify-center'><BsDoorOpenFill className='mr-1'/>Login</Link>
            </>
            }
          </ul>
      </div>
    </nav>
  )
}

export default Nav