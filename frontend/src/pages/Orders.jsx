import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const {backendUrl, token, currency} = useContext(ShopContext); //backend url previously was products
  const [orderData, setorderData] = useState([]) // after making backend this new state is created
  const loadOrderData=async()=>{
    try{
      if(!token){
        return null
      }
      const res = await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})
      // console.log(res.data); 
      if(res.data.success){
        let allOrdersItem =[]
        res.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        console.log(allOrdersItem);
        setorderData(allOrdersItem.reverse())
      }
    }catch(error){
      console.log(error);
    }
  }

  const itemsPerPage=8
  const [currentPage,setCurrentPage] = useState(1)
  const lastIndex = currentPage*itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const currentItems = orderData.slice(firstIndex,lastIndex)
  const totalPages = Math.ceil(orderData.length/itemsPerPage)
  const pageNumbers = Array.from({length: totalPages}, (_,index)=>index+1)
  
  const handlePageClick=(pageNumber)=>{
    setCurrentPage(pageNumber)
  }
  const handlePrevPage=()=>{
    if(currentPage>1){
      setCurrentPage(prev=>prev-1)
    }
  }
  const handleNextPage=()=>{
    if(currentPage<totalPages){
      setCurrentPage(prev=>prev+1)
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div>
        {
          currentItems.map((item,index)=>(  //orderdata is used here in place of products
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-large'>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p  className='mt-1'>Date: <span className='text-gray-400 '>{new Date(item.date).toDateString()}</span></p>
                  <p  className='mt-1'>Payment Mode: <span className='text-gray-400 '>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
       {/* Pagination controls */}
       <div className='w-fit border mx-auto mt-7'>
          <button onClick={handlePrevPage}
          disabled={currentPage===1}
          className='px-4 py-2 border mx-auto border-gray-500  disabled:opacity-50'
          >Prev</button>
          <button>
            {pageNumbers.map((page)=>(
              <button key={page} onClick={()=>handlePageClick(page)}
               className={`px-4 py-2 border border-gray-500 ${currentPage===page ? 'bg-[green]':''}`}
               >{page}</button>
            ))}
          </button>
          <button onClick={handleNextPage}
          disabled={currentPage===totalPages}
          className='px-4 py-2 border border-gray-500  disabled:opacity-50'
          >Next</button>
        </div>
    </div>
  )
}

export default Orders