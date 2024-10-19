import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const res = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });
      console.log(res.data);
      if (res.data.success) {
        setOrders(res.data.orders.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const statusHandler = async (event, orderId) => {
    // event.preventDefault();
    try {
      const res = await axios.post(backendUrl + "/api/order/status", { orderId, status: event.target.value }, { headers: { token } });
      if (res.data.success) {
        await fetchAllOrders();
        // console.log(fetchAllOrders());
      }
    } catch (error) {
      console.log(error);
      toast.error(res.data.message);
    }
  };

  // Pagination control
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItem = orders.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);
  return (
    <div>
      <h3 className="text-orange-500">Order Page</h3>
      <div>
        {currentItem.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ", "}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2 font semibold">
              <option onClick={(event) => console.log(event.target.value)} value="Order Placed">
                Order Placed
              </option>

              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="w-fit border mx-auto mt-7">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 border mx-auto border-gray-500  disabled:opacity-50">
          Prev
        </button>

        {pageNumbers.map((page) => (
          <button key={page} onClick={() => handlePageClick(page)} className={`px-4 py-2 border border-gray-500 ${currentPage === page ? "bg-[green]" : ""}`}>
            {page}
          </button>
        ))}

        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 border border-gray-500  disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
