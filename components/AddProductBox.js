"use client"
import { Schema } from '@/app/schema/product';
import { concatingBillingProduct, setDropdownEmpty, sliceingClientBillProd, toggleProductBox } from '@/slices/apiCallSlice';
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
const AddProductBox = ({editFuncData}) => {
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.apiCall.bills);
  const editClientProd = useSelector((state) => state.apiCall.editClientProd);
    const data = {
        productName: editFuncData.productName,
        quantity: editFuncData.quantity,
        price: editFuncData.price,
      };
      const { values, handleChange, handleSubmit } = useFormik({
        initialValues: data,
        validationSchema: Schema,
        onSubmit: async (values) => {
          const product = {
            id:new Date().toLocaleTimeString(),
            billNumber :bills.length+1,
            productName:editFuncData.productName,
            quantity:values.quantity,
            price:values.price
          }
          if (editClientProd===null) {
            dispatch(toggleProductBox());
            dispatch(concatingBillingProduct(product));
            dispatch(setDropdownEmpty());
          }else{
            dispatch(sliceingClientBillProd(editClientProd));
            dispatch(toggleProductBox());
            dispatch(concatingBillingProduct(product));
          dispatch(setDropdownEmpty());
          }
        },
      });
  return (
    <div className='fixed left-0 top-0 z-50 flex justify-center items-center w-full h-full backdrop-blur-sm'>
      <form onSubmit={handleSubmit} className="lg:w-1/2 w-11/12 p-5 mx-auto bg-gray-300 rounded shadow-xl shadow-slate-600 border border-black text-black">
        <label htmlFor="name">Product Name</label>
              <h1 className='text-lg text-gray-800 font-medium capitalize'>{editFuncData.productName}</h1>
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                onChange={handleChange}
                id="quantity"
                autoFocus='true'
                name="quantity"
                value={values.quantity}
                className="bg-gray-100 text-black w-full border px-3 lg:text-lg text-base border-black rounded mb-5"
              />
              <label htmlFor="price">Price</label>
              <input
                type="number"
                onChange={handleChange}
                id="price"
                name="price"
                value={values.price}
                className="bg-gray-100 text-black w-full border px-3 lg:text-lg text-base border-black rounded mb-3"
              />
              <div className='flex justify-between'>
                <button
                  type="submit"
                  className="bg-blue-700 rounded px-3 py-1 border-2 border-white text-white hover:bg-blue-500"
                >
                  Add Product
                </button>
                <button
                onClick={()=>dispatch(toggleProductBox())}
                  className="bg-blue-700 rounded border-2 border-white px-3 py-1 text-white hover:bg-blue-500"
                >
                  Cancel
                </button>
              </div>
        </form>
    </div>
  )
}

export default AddProductBox;