import React, { useEffect, useState } from 'react'
import {assets} from '../assets/assets'

const Hero = () => {
  const heroImages = [
    assets.hero_img,
    assets.hero_img1,
    assets.hero_img2
  ]
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade,setFade] = useState(true)
  useEffect(()=>{
    const interval = setInterval(()=>{
      setFade(false)
      setTimeout(()=>{
        setCurrentImageIndex((prevIndex)=>(prevIndex+1)%heroImages.length);
        setFade(true);
      },200)
    },5000)

    return ()=>clearInterval(interval)
  },[heroImages.length])
  return (
    <div className='flex flex-col sm:flex-row border border-orange-400 sm:rounded-xl'>
        {/* Hero left side */}
        <div className='w-full sm:rounded-l-xl sm:w-1/2 flex items-center justify-center py-10 sm:py-0 bg-gradient-to-r from-green-300 to-blue-100'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                  <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                  <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>New Arrivals</h1>
                <div className='flex items-center gap-2'>
                  <p className='font-semibold text-sm md:text-base'> SHOP NOW</p>
                  <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                </div>
            </div>
        </div>
        {/* Hero right side */}
        <img src={heroImages[currentImageIndex]} className={`sm:rounded-r-xl w-full sm:w-1/2 transition-opacity ${fade ? 'opacity-100' : 'opacity-50'}`} alt="Hero" />
    </div>
  )
}

export default Hero