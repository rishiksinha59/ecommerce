import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum repellendus recusandae deleniti sint, officia doloribus illum modi nemo mollitia quidem animi provident, facere vitae saepe eligendi quo. Eligendi, perspiciatis a!</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio, beatae, voluptatibus saepe sequi aut explicabo ullam temporibus quisquam rem quis tempora similique id asperiores. Iure tempora dolore itaque. Hic, culpa!</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam harum nesciunt omnis sequi officiis porro dicta odit ratione, saepe enim debitis, quod cumque minima mollitia commodi ipsum placeat, obcaecati impedit.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum iusto eius illo accusamus tenetur, veritatis rerum ut modi illum nesciunt, praesentium atque labore amet explicabo sunt magnam veniam alias pariatur!</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi harum illum explicabo dolor aspernatur accusantium saepe neque, nostrum quos consequuntur corrupti eos, tempora rerum repellendus odit similique expedita natus deleniti.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quidem vitae quo qui, neque omnis id? Debitis fuga officia rerum tempora asperiores similique ut obcaecati aut. Tenetur autem officia quibusdam.</p>
          </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About