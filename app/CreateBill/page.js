"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBills,
  fetchDropdownProducts,
  generatingBill,
  setDropdownEmpty,
  setQuery,
  toggleProductBox,
  toggleLoading,
  setClientBillingProductsEmpty,
} from "@/slices/apiCallSlice";
import Loader from "@/components/Loader";
import AddProductBox from "@/components/AddProductBox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const page = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(process.env.NEXT_PUBLIC_AUTH_URL);
    },
  });
  const dispatch = useDispatch();
  const query = useSelector((state) => state.apiCall.query);
  const dropdownProducts = useSelector((state) => state.apiCall.dropdownProducts);
  const loading = useSelector((state) => state.apiCall.loading);
  const clientBillingProducts = useSelector((state) => state.apiCall.clientBillingProducts);
  const showProductBox = useSelector((state) => state.apiCall.showProductBox);
  const subTotal = useSelector((state) => state.apiCall.subTotal);
  const bills = useSelector((state) => state.apiCall.bills);
  const [customerName, setCustomerName] = useState("");
  useEffect(() => {
    dispatch(fetchBills());
  }, []);
  // Displaying search result on searching in search field ....
  const dropdownEdit = async (e) => {
    dispatch(setQuery(e.target.value));
    if (query.length >= 2) {
      dispatch(toggleLoading());
      dispatch(fetchDropdownProducts(query));
    } else {
      dispatch(setDropdownEmpty());
    }
  };
  // Adding Product to billing product list
  const [editFuncData, setEditFuncData] = useState("");
  const addProduct = async (item) => {
    dispatch(setDropdownEmpty());
    setEditFuncData(item);
    dispatch(toggleProductBox());
  };
  // generating Bill
  const generateBill = async () => {
    dispatch(generatingBill(clientBillingProducts));
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/bills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        billNumber: bills.length+1,
        biller: session?.user?.email?.slice(0, 11),
        customer: customerName,
        subTotal: subTotal,
        billingDate:new Date().toJSON().slice(0, 10)
      }),
    });
    dispatch(setClientBillingProductsEmpty());
  };
  return (
    <>
      <ToastContainer />
      <div className="container relative mx-auto lg:px-4 px-1">
        {/* small Box To set Quantity */}
        {showProductBox && <AddProductBox editFuncData={editFuncData} />}
        {/* Search Bar */}
        <h1 className="lg:text-xl text-lg font-semibold mt-2">
          Search to add Products
        </h1>
        <div className="flex">
          <input
            type="text"
            id="search"
            className="bg-gray-200 border capitalize lg:text-lg text-base flex-1 border-black rounded-md px-3 py-1"
            placeholder="Enter product name"
            onChange={dropdownEdit}
          />
        </div>
        {/* Displaying Dropdown Products and Loader */}
        {loading && <Loader />}
        <div className="absolute w-10/12 z-30 bg-white">
          {dropdownProducts?.map((item) => {
            return (
              <div
                onClick={() => addProduct(item)}
                key={item._id}
                className="container my-1 flex justify-between items-center lg:text-lg text-base bg-gray-200 lg:px-4 px-2 rounded border border-gray-400 hover:bg-gray-300"
              >
                <h1 className="capitalize">{item.productName}</h1>
                <h1>{item.quantity}</h1>
                <h1>₹{item.price}</h1>
              </div>
            );
          })}
        </div>
        {/* Billing Detail Box */}
        <div className="lg:px-4 px-2 mt-2 border border-black rounded bg-slate-200">
          <h1 className="text-center text-xl font-medium">
            Akanksha Enterprises
          </h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="capitalize text-lg font-medium">
              Biller:{session?.user?.email?.slice(0, 11)}
            </h1>
            <div>
              <label htmlFor="customer" className="capitalize text-lg font-medium">Customer: </label>
              <input type="text" name="customer" autoFocus="true" onChange={(e)=>setCustomerName(e.target.value)} className="capitalize text-lg font-medium rounded px-2 bg-slate-100" />
            </div>
            <h1 className="capitalize text-lg font-medium">Bill Number:{bills.length+1}</h1>
          </div>
          <table className="border-collapse w-full bg-red-100 mb-10 mt-2">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2">Product Name</th>
                <th className="border border-black px-4 py-2">Quantity</th>
                <th className="border border-black px-4 py-2">Price</th>
                <th className="border border-black px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {clientBillingProducts.map((item) => (
                <tr key={item.productName}>
                  <td className="border capitalize border-black px-4 py-2">
                    {item.productName}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {item.quantity}
                  </td>
                  <td className="border border-black px-4 py-2">
                    ₹{item.price}
                  </td>
                  <td className="border border-black px-4 py-2">
                    ₹{item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1 className="text-right text-lg font-medium">
            SubTotal :₹{subTotal}
          </h1>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => generateBill()}
            className="bg-blue-500 rounded px-2 text-lg py-1 mt-2 text-white hover:bg-blue-700"
          >
            Generate Bill
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
