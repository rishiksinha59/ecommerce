import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };
  // Pagination control
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItem = list.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(list.length / itemsPerPage);
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
    fetchList();
  }, []);
  return (
    <div>
      <p className="mb-2 text-orange-500">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* -------List Table Title ------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-[green] text-sm text-white">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* ----Product List---- */}
        {currentItem.map((item, index) => (
          <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm" key={index}>
            <img src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p onClick={() => removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg">
              X
            </p>
          </div>
        ))}
      </div>
      {/* pagination control */}
      <div className="w-fit border mx-auto mt-7">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 border mx-auto border-gray-500  disabled:opacity-50">
          Prev
        </button>
        <button>
          {pageNumbers.map((page) => (
            <button key={page} onClick={() => handlePageClick(page)} className={`px-4 py-2 border border-gray-500 ${currentPage === page ? "bg-[green]" : ""}`}>
              {page}
            </button>
          ))}
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 border border-gray-500  disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default List;
