import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { Router } from '../../utils/Axios';
import {useDispatch} from 'react-redux'
import { LOGIN } from '../../@Redux/userReducer';
const Login = () => {
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    let [data,setData] = useState({ username : '', password : ''})
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        let { username, password } = data;
        try {
            let res = await Router.post('/auth/login',{ user : username, password });
            if(res.data){
                toast.success('Logged Successfully')
                setLoading(false)
                dispatch(LOGIN({ id : res.data.data._id, isAdmin : res.data.data.isAdmin, profile : res.data.data.profile, reload : true, username : res.data.data.username }))
                setData({})
                navigate('/')
            }
        } catch (error) {
            toast.error(error.response.data.error)
            setLoading(false)
            setData({})
        }
    }
  return (
    <div className='flex items-center justify-center h-[80vh]'>
        <div className='p-1 shadow-md shadow-black/50 my-5 w-[360px]'>
            <h1 className='font-light font-Roboto underline my-3 text-4xl text-center'>Login!</h1>
            <form action="" className='flex items-start justify-start flex-col w-11/12 mx-auto' onSubmit={handleSubmit}>
                <div className='flex text-start justify-start flex-col w-full my-1'>
                    <label htmlFor="username" className='underline tracking-widest mb-1 ml-4'>Username or Email Address</label>
                    <input value={data.username} onChange={(e) => setData({...data, username : e.target.value})} className='text-sm p-2 outline-none border-solid border-[#2196f3] border-[1px] mt-1 text-black' type="text" placeholder='E.g. John || example@gmail.com' />
                </div>
                <div className='flex text-start justify-start flex-col w-full my-1'>
                    <label htmlFor="password" className='underline tracking-widest mb-1 ml-4'>Password</label>
                    <input value={data.password} onChange={(e) => setData({...data, password : e.target.value})} className='text-sm p-2 outline-none border-solid border-[#2196f3] border-[1px] mt-1 text-black' type="password" name="password" id="password" placeholder='E.g. JAa;903eujd"/)' />
                </div>
                <button className='p-2 bg-[#2196f3] text-white w-full font-Roboto my-3 text-sm'>{loading  ? <ClipLoader color={color} loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader" /> : 'Login'}</button>
            </form>
            <h1 className='text-xs font-Roboto text-center my-2 font-light'>Don't have an Account? <Link className='ml-2 font-bold' to={'/register'}>Register</Link></h1>
        </div>
    </div>
  )
}

export default Login