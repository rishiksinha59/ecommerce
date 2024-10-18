import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [emptyCartImg, setEmptyCartImg] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  useEffect(() => {
    if (cartData.length === 0) {
      setEmptyCartImg(true);
    } else {
      setEmptyCartImg(false);
    }
  }, [cartData]);

  return products.length > 0 && !emptyCartImg ? (
    <div className="border-t pt-9 ">
      <div className="text-2xl text-center mb-4">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div className="flex flex-wrap-reverse md:flex-nowrap justify-between  w-full  gap-5  max-w-[1100px] mx-auto ">
        <div className="md:w-[50%] w-[100%]  ">
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div key={index} className="py-4 pl-4 border mb-3 text-gray-700 flex gap-3 items-center shadow-lg">
                <div className="flex items-start  gap-6 max-w-[500px] w-[90%] sm:w-[100%] ">
                  <img className="w-[100px] my-auto" src={productData.image[0]} alt="" />
                  <div className="flex flex-col  max-w-[400px] w-full  py-4 ">
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center w-[100%] gap-2 justify-around mt-6">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1  bg-slate-50">{item.size}</p>
                      <input onChange={(e) => (e.target.value === "" || e.target.value === "0" ? null : updateQuantity(item._id, item.size, Number(e.target.value)))} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" type="number" min={1} defaultValue={item.quantity} />
                      <img onClick={() => updateQuantity(item._id, item.size, 0)} className="w-4 mr-4 sm:w-5 cursor-pointer" src={assets.bin_icon} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="md:w-[40%] w-[100%]">
          <div className="w-full ">
            <CartTotal />
            <div className="w-full">
              <button onClick={() => navigate("/place-order")} className="bg-black text-white w-full  text-sm my-8 px-8 py-3 hover:bg-opacity-80">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen ">
      <div className="w-1/4 mx-auto mt-10 flex flex-col">
        <img src={assets.empty_cart} alt="" />
        <h1 className="text-center leading-10">Hey, your cart feels so light!</h1>
        <h1 className="text-center">Let&apos;s add some items in your cart</h1>
        <Link to="/" className="bg-[orange] hover:bg-[green] duration-150 p-4 mt-5">
          <p className="text-center">Start Shopping</p>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
