import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { toast } from "react-toastify";
import { RiDiscountPercentFill } from "react-icons/ri";


const OrderTotal = () => {
  const { currency, delivery_fee, getCartAmount, discount, discountedAmount,setDiscountedAmount } = useContext(ShopContext);
  useEffect(()=>{
    if (!discount.applied) {
      setDiscountedAmount(getCartAmount());
    }
  },[setDiscountedAmount,discount.applied,getCartAmount])
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {discountedAmount.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {delivery_fee}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}{(discountedAmount+delivery_fee).toFixed(2)}
          </b>
        </div>
       
        
      </div>
    </div>
  );
};

export default OrderTotal;
