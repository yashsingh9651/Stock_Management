"use client"
import { Schema } from '@/app/schema/product';
import { concatingBillingProduct, setShowProductBox } from '@/slices/apiCallSlice';
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux';
const AddProductBox = ({editFuncData}) => {
  const dispatch = useDispatch();
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
            BillNumber :1,
            productName:values.productName,
            quantity:values.quantity,
            price:values.price
          }
          dispatch(concatingBillingProduct(product));
          dispatch(setShowProductBox());
        },
      });
  return (
    <form onSubmit={handleSubmit} className="absolute right-4 top-52 w-1/2 p-1 mx-auto bg-black rounded text-white z-50">
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
            <button
              type="submit"
              className="bg-blue-500 rounded px-3 ml-auto py-1 text-white hover:bg-blue-700"
            >
              Add Product
            </button>
      </form>
  )
}

export default AddProductBox;