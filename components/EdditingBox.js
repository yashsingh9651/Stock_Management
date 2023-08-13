import React from "react";
import { Schema } from "../app/schema/product";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { GiCrossMark } from "react-icons/gi";
import {
  editProduct,
  fetchDropdownProducts,
  toggleEditBox,
} from "@/slices/apiCallSlice";
const EdditingBox = ({ editFuncData }) => {
  const query = useSelector((state) => state.apiCall.query);
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
      dispatch(editProduct(values));
      setTimeout(() => {
        dispatch(fetchDropdownProducts(query));
      }, 4000);
    },
  });
  return (
    <>
      <div className="w-full border border-black flex justify-center backdrop-blur-sm items-center bg-opacity-70 bg-gray-100 h-full fixed z-50 top-0">
        <div className="lg:w-1/2 w-11/12 border border-black max-h-fit relative bg-gray-300 rounded-lg p-4 shadow-xl shadow-slate-600">
          <h1
            className="absolute text-2xl text-red-500 hover:text-red-700 top-4 right-5 z-50"
            onClick={() => {
              dispatch(toggleEditBox());
            }}
          >
            <GiCrossMark />
          </h1>
          <h1 className="text-center text-xl font-semibold underline underline-offset-4">
            Edit Product
          </h1>
          <form className="mt-5" onSubmit={handleSubmit}>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              onChange={handleChange}
              id="name"
              placeholder="Minimum 3 letters"
              name="productName"
              value={values.productName}
              className="bg-gray-100 w-full capitalize border px-3 lg:text-lg text-base border-black rounded mb-5"
            />
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              onChange={handleChange}
              id="quantity"
              autoFocus={true}
              name="quantity"
              value={values.quantity}
              className="bg-gray-100 w-full border px-3 lg:text-lg text-base border-black rounded mb-5"
            />
            <label htmlFor="price">Price</label>
            <input
              type="number"
              onChange={handleChange}
              id="price"
              name="price"
              value={values.price}
              className="bg-gray-100 w-full border px-3 lg:text-lg text-base border-black rounded mb-3"
            />
            <button
              type="submit"
              className="bg-blue-500 rounded px-3 py-1 text-white hover:bg-blue-700 border-2 border-white"
            >
              Edit Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default EdditingBox;
