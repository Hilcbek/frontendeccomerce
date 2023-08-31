
import {IoSend} from 'react-icons/io5'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
const NewSletter = () => {
  const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();

      if(form.current[0].value !== '' || form.current[0].value !== '' || form.current[0].value !== '' || form.current[0].value !== ''){
        emailjs.sendForm('service_qt3dt0m', 'template_19coszm', form.current, 'tyng7ZVPFyugseZTR')
        .then((result) => {
            toast.success('Email Sent!')
        }, (error) => {
            toast.error(error.text);
        });
      }else{
        toast.error('Fill all the your informations');
      }
    };
  return (
    <div className='h-auto py-10 bg-[aliceblue] flex items-center justify-center flex-col'>
        <h1 className='xs:text-5xl lg:text-7xl mb-5 font-bold font-Roboto text5'>Contact Me</h1>
        <p className='my-3 font-medium font-Quicksand tracking-widest'>Contact Me If You Want to Hire Me!</p>
        <form ref={form} onSubmit={sendEmail} className='flex items-center justify-center xs:w-11/12 lg:w-7/12 mx-auto flex-col'>
            <input type="text" name="user_name" id="" placeholder='Your name...' className='p-3 outline-none w-11/12 border-solid border-b-[1.5px] border-[#009866]' />
            <input type="text" name="user_email" id="" placeholder='Your email...' className='my-3 p-3 outline-none w-11/12 border-solid border-b-[1.5px] border-[#009866]' />
            <textarea name="message" className='my-3 p-3 border-solid border-b-[1.5px] border-[#009866] resize-none break-words w-11/12 h-[200px] outline-none' placeholder='Your message...' />
            <input type='submit' value={'Send Email'} className='p-3 text-white bg-[#009866] flex items-center justify-center w-8/12 border-solid border-black border-[1px]' />
        </form>
    </div>
  )
}

export default NewSletter