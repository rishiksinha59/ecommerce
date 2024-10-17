import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { toast } from "react-toastify";
import { RiDiscountPercentFill } from "react-icons/ri";


const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, discountedAmount, discount, setDiscount, setDiscountedAmount } = useContext(ShopContext);
  useEffect(() => {
    if (!discount.applied) {
      setDiscountedAmount(getCartAmount());
    }
  }, [getCartAmount, discount.applied, setDiscountedAmount]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (discount.coupon === "PELICAN30" && !discount.applied) {
      const newTotal = getCartAmount()*0.7;
      setDiscountedAmount(newTotal);
      setDiscount({ ...discount, applied: true });
      toast.success(`Yay! You saved ${currency}${(getCartAmount() - newTotal).toFixed(2)}`);
    } else {
      toast.error("Invalid Coupon");
    }
  };
  const onCouponChange = (e) => {
    setDiscount({ ...discount, coupon: e.target.value, applied: false });
    setDiscountedAmount(getCartAmount());
  };

  return (
    <div className="w-full">
      <div className="overflow-hidden whitespace-nowrap mb-5 border bg-black">
        <p className="animate-marquee text-white flex gap-2 items-center">
          <RiDiscountPercentFill className="text-orange-300 " />
          Use Coupon Code <span className="text-orange-200"> PELICAN30</span> to avail 30% Flat Discount{" "}
        </p>
      </div>
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {discountedAmount.toFixed(2)}.00
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
            {currency}
            {discountedAmount === 0 ? 0 : (discountedAmount + delivery_fee).toFixed(2)}
          </b>
        </div>
        <div className="mt-2">
          <form onSubmit={onSubmitHandler} className="flex gap-3">
            <input className="border p-2 border-orange-500" type="text" value={discount.coupon} placeholder="Enter Coupon Code" onChange={onCouponChange} />
            <button className="border bg-green-500 text-white px-3 hover:bg-black duration-100" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
