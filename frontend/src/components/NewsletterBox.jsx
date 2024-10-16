import React, { useState } from 'react'
import { toast } from 'react-toastify';


const NewsletterBox = () => {
  const [email,setEmail] = useState('')

    const onSubmitHandler=(event)=>{
      event.preventDefault()
      if(email){
        toast.success("Subscribed Successfully")
        setEmail('')
      }else{
        toast.error("Please enter a valid email");
      }
    }
  return (
    <div className='text-center '>
        <p className='text-2xl font-medium text-gray-800'><span className='text-[green]'>Subscribe</span> now & get <span className='text-orange-500'>20% off</span></p>
        <p className='text=gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla aut, eos fugit a praesentium eaque dignissimos consequuntur libero! Deleniti quibusdam laborum maiores eveniet rem distinctio nisi praesentium fugiat, consequatur laudantium.</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' required>
            <input className='w-full sm:flex-1 outline-none' onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email' required/>
            <button type='submit' className='bg-[green] text-white text-[15px] px-10 py-4 hover:bg-black duration-200' >SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox