import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import OrderTotal from '../components/OrderTotal'
import confetti from 'canvas-confetti' 

const PlaceOrder = () => {
  const [method,setMethod] = useState('cod')
  const {navigate,backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, discountedAmount} = useContext(ShopContext)
  const [formData,setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })
  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value= event.target.value;

    setFormData(data =>({...data,[name]:value}))
  }

  const initPay=(order)=>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id : order.id,
      receipt : order.receipt,
      handler: async(res)=>{
        console.log(res);
        try{
          const {data} = await axios.post(backendUrl+'/api/order/verifyRazorpay',res,{headers:{token}})
          if(data.success){
            triggerConfetti() 
            navigate('/orders')
            setCartItems({})
          }
        }catch(error){
          console.log(error);
          toast.error(error)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const triggerConfetti = () => {
    // Trigger confetti effect
    confetti({
      particleCount: 500,
      spread: 100,
      origin: { y: 0.6 }
    })
  }

  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try{
      let orderItems = []
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity =  cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: discountedAmount+delivery_fee
      }
      switch(method){
        // API calls for COD
        case 'cod':
          const res = await axios.post(backendUrl+'/api/order/place', orderData, {headers:{token}})
          if(res.data.success){
            triggerConfetti()
            setCartItems({})
            toast.success(res.data.message)
            navigate('/orders')

          }else{
            toast.error(res.data.message)
            console.log(res.data.message)
          }
          break;
        case 'stripe':
          const responseStripe = await axios.post(backendUrl+'/api/order/stripe',orderData, {headers:{token}})
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          }else{
            toast.error(responseStripe.data.message)
          }
          break;
        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl+'/api/order/razorpay',orderData, {headers:{token}})
          if(responseRazorpay.data.success){
            // console.log(responseRazorpay.data.order);
            initPay(responseRazorpay.data.order)
          }else{
            toast.error(responseRazorpay.data.message)
          }
          break;
        default :
          break;
        
      }
      console.log(orderItems);
    }catch(error){
      console.log(error);
    }
  }
  
  return (
    <form onSubmit={onSubmitHandler} className='flex  mx-auto flex-col mg:flex-row  justify-between gap-10 mg:gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      {/* ----Left side----- */}
      <div className='flex flex-col gap-4 w-full mg:max-w-[600px]'>
        <div className='text-xl sm:text-2xl '>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input required  onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name'/>
          <input  required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name'/>
        </div>
        <input  required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address'/>
        <input  required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street'/>
        <div className='flex gap-3'>
          <input  required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'/>
          <input  required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'/>
        </div>
        <div className='flex gap-3'>
          <input required  onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode'/>
          <input required  onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country'/>
        </div>
        <input  required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone'/>

      </div>
      {/* ----Right side---- */}
      <div className=' mg:max-w-[500px] w-full'>
        <div className='min-w-80 w-full'>
            <OrderTotal/>
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* ----Payment Method Selection---- */}
          <div className='flex gap-3 flex-row mg:flex-col lg:flex-row'>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400': ''}`}></p>
              <img className='h-4 sm:h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400': ''}`}></p>
              <p className='text-gray-500  text-[12px] sm:text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className=' text-end mt-8'>
            <button type='submit'  className='bg-black text-white px-16 py-3 w-full text-sm hover:opacity-85'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder