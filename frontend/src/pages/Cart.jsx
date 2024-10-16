import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { Link } from 'react-router-dom';

const Cart = () => {
  const {products,currency, cartItems, updateQuantity, navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [emptyCartImg,setEmptyCartImg] = useState(false)
 

  useEffect(()=>{
    if(products.length>0){
    const tempData = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item]>0){
          tempData.push({
            _id: items,
            size:item,
            quantity:cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData)
   
  }
  },[cartItems,products])

  useEffect(()=>{
    if(cartData.length===0){
      setEmptyCartImg(true)
    }else{
      setEmptyCartImg(false)
    }
  },[cartData])

  return products.length>0 && !emptyCartImg ? (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>
      <div>
        {
          cartData.map((item,index)=>{
            const productData = products.find((product)=>product._id === item._id);
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{productData.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <input onChange={(e)=>e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,item.size,Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity}/>
                  <img onClick={()=>updateQuantity(item._id,item.size,0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            )
          })
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
          <div className='w-full text-end'>
            <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  ) : 
  <div className='h-screen '>
    <div className='w-1/4 mx-auto mt-10 flex flex-col'>
    <img src={assets.empty_cart} alt="" />
      <h1 className='text-center leading-10'>Hey, your cart feels so light!</h1>
      <h1 className='text-center'>Let&apos;s add some items in your cart</h1>
      <Link to='/' className='bg-[orange] hover:bg-[green] duration-150 p-4 mt-5'>
      <p className='text-center'>Start Shopping</p>
      </Link>
      
    </div>
    
  </div>
}

export default Cart