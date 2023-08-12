"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import {
  fetchDropdownProducts,
  setDropdownEmpty,
  setQuery,
  toggleRestockProductBox,
  toggleLoading,
  setRestockBillingProductsEmpty,
  sliceingRestockBillProd,
  toggleEditClientProd,
  fetchRestockBills,
  AddingStockBill,
} from "@/slices/apiCallSlice";
import AtomicSpinner from "@/components/AtomicSpinner";
import RestockAddProdBox from "@/components/RestockAddProdBox";
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
  const restockBillingProducts = useSelector((state) => state.apiCall.restockBillingProducts);
  const showRestockProductBox = useSelector((state) => state.apiCall.showRestockProductBox);
  const subTotal = useSelector((state) => state.apiCall.subTotal);
  const restockBills = useSelector((state) => state.apiCall.restockBills);
  const [stockerName, setStockerName] = useState("");
  useEffect(() => {
    dispatch(fetchRestockBills());
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
  // Adding Product to billing product list...
  const [editFuncData, setEditFuncData] = useState("");
  const addProduct = async (item) => {
    dispatch(setDropdownEmpty());
    setEditFuncData(item);
    dispatch(toggleRestockProductBox());
  };
  // Editing Product of billing product list...
  const editProd = (item) => {
    setEditFuncData(item);
    dispatch(toggleRestockProductBox());
    dispatch(toggleEditClientProd(item.id));
  }
  // Adding Restock Bill and updating products .....
  const addProductsAfterBill = async (element) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/reduceAddProducts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(element),
      }
    );
    await response.json();
  };
  const generateBill = async () => {
    dispatch(AddingStockBill(restockBillingProducts));
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getPostRestockBills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        billNumber: restockBills.length+1,
        biller: session?.user?.email?.slice(0, 11),
        stocker: stockerName,
        subTotal: subTotal,
        billingDate:new Date().toJSON().slice(0, 10)
      }),
    });
    restockBillingProducts.forEach(element => {
        addProductsAfterBill(element);
    });
    dispatch(setDropdownEmpty());
    dispatch(setRestockBillingProductsEmpty());
  };
  return (
    <>
      <ToastContainer />
      <div className="container relative mx-auto lg:px-4 px-1">
        {/* small Box To set Quantity */}
        {showRestockProductBox && <RestockAddProdBox editFuncData={editFuncData} />}
        {/* Search Bar */}
        <h1 className="lg:text-lg font-semibold mt-3">
          Search to add Products
        </h1>
        <div className="flex">
          <input
            type="text"
            id="search"
            className="bg-gray-100 border capitalize lg:text-base flex-1 border-black rounded-md px-3 py-1"
            placeholder="Enter product name"
            onChange={dropdownEdit}
          />
        </div>
        {/* Displaying Dropdown Products and Loader */}
        {loading && <AtomicSpinner />}
        <div className="absolute w-10/12 z-30 backdrop-blur">
          {dropdownProducts?.map((item) => {
            return (
              <div
                onClick={() => addProduct(item)}
                key={item._id}
                className="container my-1 flex justify-between items-center lg:text-lg bg-gray-100 lg:px-4 px-2 rounded border border-gray-400 hover:bg-gray-300"
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
          <div className="flex justify-between items-center mt-2">
          <h1 className="capitalize text-lg font-medium">
              Biller: {session?.user?.email?.slice(0, 11)}
            </h1>
            <div>
              <label htmlFor="sender" className="capitalize text-lg font-medium">Sender: </label>
              <input type="text" required placeholder="Sender Name" name="sender" autoFocus="true" onChange={(e)=>setStockerName(e.target.value)} className="capitalize text-lg font-medium rounded px-2 bg-slate-100 py-1" />
            </div>
            <h1 className="capitalize text-lg font-medium">Bill Number:{restockBills.length+1}</h1>
          </div>
          <table className="border-collapse w-full bg-gray-300 mb-10 mt-2">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2">Product Name</th>
                <th className="border border-black px-4 py-2">Quantity</th>
                <th className="border border-black px-4 py-2">Price</th>
                <th className="border border-black px-4 py-2">Total</th>
              </tr>
            </thead>
            {/* Billing Products... */}
            <tbody>
              {restockBillingProducts.map((item) => (
                <tr key={item.id}>
                  <td className="border capitalize border-black px-4 py-2">
                    {item.productName}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {item.quantity}
                  </td>
                  <td  className="border border-black px-4 py-2">
                    ₹{item.price}
                  </td>
                  <td className="border border-black px-4 py-2 relative">
                    ₹{item.price * item.quantity}
                    <div className="absolute right-1 top-1 z-50 text-3xl flex">
                    <FaEdit title="Edit" onClick={()=>editProd(item)} className="text-green-400 hover:text-green-600 mr-3 cursor-pointer" />
                    <AiTwotoneDelete title="Delete" onClick={()=>dispatch(sliceingRestockBillProd(item.id))} className="text-red-400 hover:text-red-600 cursor-pointer" />
                    </div>
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
            disabled={restockBillingProducts.length===0}
            className="bg-blue-500 rounded border-2 border-black px-2 text-lg disabled:bg-blue-300 disabled:border py-1 mt-2 text-white hover:bg-blue-700"
          >
            Restock
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
