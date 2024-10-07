import React from 'react'
import { toast } from 'react-toastify';
const NewsletterBox = () => {
    const onSubmitHandler=(event)=>{
        event.preventDefault();
        toast.success("Subscribed Successfully")
    }
  return (
    <div className='text-center '>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text=gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla aut, eos fugit a praesentium eaque dignissimos consequuntur libero! Deleniti quibusdam laborum maiores eveniet rem distinctio nisi praesentium fugiat, consequatur laudantium.</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
            <button onClick={onSubmitHandler} type='submit' className='bg-black text-white text-xs px-10 py-4' >SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox