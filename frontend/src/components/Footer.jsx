import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
    const location = useLocation();
    useEffect(()=>{
        window.scrollTo({top: 0,behavior:'smooth'});
    },[location])
  return (
    <div>
        <div className='flex flex-col  sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt consequuntur dolores delectus, debitis unde nemo illum ullam ex dolorum possimus error. Inventore esse saepe similique corrupti maiores, dignissimos iure reprehenderit.</p>
            </div>
        
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <Link to = '/' className='hover:text-[green]'>
                <li>Home</li>
                </Link>
                <Link to='/about' className='hover:text-[green]'>
                <li>About Us</li>
                </Link>
                <Link to='/collection' className='hover:text-[green]'><li>Collection</li></Link>
                <Link to='/contact' className='hover:text-[green]'><li>Contact</li></Link>
                <Link to='/orders' className='hover:text-[green]'><li>Orders</li></Link>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91-74880-71758</li>
                <li>contact@pelican.com</li>
            </ul>
        </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@pelican.com - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer