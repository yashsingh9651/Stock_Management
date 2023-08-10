"use client"
import { Schema } from '@/app/schema/product';
import { concatingBillingProduct, toggleProductBox } from '@/slices/apiCallSlice';
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
const AddProductBox = ({editFuncData}) => {
  const dispatch = useDispatch();
  
  const bills = useSelector((state) => state.apiCall.bills);
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
            BillNumber :bills.length+1,
            productName:values.productName,
            quantity:values.quantity,
            price:values.price
          }
          dispatch(concatingBillingProduct(product));
          dispatch(toggleProductBox());
        },
      });
  return (
    <div className='fixed left-0 top-0 flex justify-center items-center w-full h-full backdrop-blur-sm'>
      <form onSubmit={handleSubmit} className="w-1/2 p-2 mx-auto bg-gray-500 rounded text-white">
        <label htmlFor="name">Product Name</label>
              <input
                type="text"
                onChange={handleChange}
                id="name"
                placeholder="Minimum 3 letters"
                name="productName"
                value={values.productName}
                className="bg-white text-black w-full capitalize border px-3 lg:text-lg text-base border-black rounded mb-5"
              />
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                onChange={handleChange}
                id="quantity"
                autoFocus='true'
                name="quantity"
                value={values.quantity}
                className="bg-white text-black w-full border px-3 lg:text-lg text-base border-black rounded mb-5"
              />
              <label htmlFor="price">Price</label>
              <input
                type="number"
                onChange={handleChange}
                id="price"
                name="price"
                value={values.price}
                className="bg-white text-black w-full border px-3 lg:text-lg text-base border-black rounded mb-3"
              />
              <div className='flex justify-between'>
                <button
                  type="submit"
                  className="bg-blue-700 rounded px-3 py-1 text-white hover:bg-blue-500"
                >
                  Add Product
                </button>
                <button
                onClick={()=>dispatch(toggleProductBox())}
                  className="bg-blue-700 rounded px-3 py-1 text-white hover:bg-blue-500"
                >
                  Cancel
                </button>
              </div>
        </form>
    </div>
  )
}

export default AddProductBox;