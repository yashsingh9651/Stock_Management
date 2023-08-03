"use client";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import EdditingBox from "@/components/EdditingBox";
import { fetchProducts, addProduct,setDropdownEmpty,toggleEditBox,toggleLoading,fetchDropdownProducts,setQuery } from "@/slices/apiCallSlice";
import { Schema } from "./schema";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.apiCall.products);
  const query = useSelector((state) => state.apiCall.query);
  const dropdownProducts = useSelector((state) => state.apiCall.dropdownProducts);
  const showEditBox = useSelector((state) => state.apiCall.showEditBox);
  const loading = useSelector((state) => state.apiCall.loading);
  // Displaying search result on typing in search field ....
  const dropdownEdit = async (e) => {
    dispatch(setQuery(e.target.value));
    if (query.length >= 2) {
      dispatch(toggleLoading());
      dispatch(fetchDropdownProducts(query));
    } else {
      dispatch(setDropdownEmpty());
    }
  };
  // Fetching Products on Page Load...
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // Handeling Edit Button....
  const [editFuncData, setEditFuncData] = useState("");
  const editFunc = (item) => {
    setEditFuncData(item);
    dispatch(toggleEditBox());
  };

  // Handleing Formik, Yup and dispatching action to add product ....
  const data = {
    productName: "",
    quantity: "",
    price: "",
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: data,
    validationSchema: Schema,
    onSubmit: async (values, action) => {
      dispatch(addProduct(values));
      action.resetForm();
    },
  });
  return (
    <>
      <Header />
      <ToastContainer />
      {showEditBox && <EdditingBox editFuncData={editFuncData} />}
      <div className="container mx-auto lg:px-10 px-2">
        {/* Search Products */}
        <h1 className="lg:text-xl text-lg font-semibold mt-8">
          Search Products
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

        {/* Displaying Dropdown Products */}
        {loading && <Loader />}
        <div className="absolute w-11/12 bg-white">
          {dropdownProducts.map((item) => {
            return (
              <div
                key={item._id}
                className="container my-1 flex justify-between items-center lg:text-lg text-base bg-gray-200 lg:px-4 px-2 rounded border border-gray-400 hover:bg-gray-300"
              >
                <h1 className="capitalize">{item.productName}</h1>
                <h1>{item.quantity}</h1>
                <h1>₹{item.price}</h1>
                <button
                  onClick={() => {
                    editFunc(item);
                  }}
                  className="text-2xl text-green-500 hover:text-red-600"
                >
                  <BiSolidEdit />
                </button>
              </div>
            );
          })}
        </div>

        {/* Adding product */}
        <form className="mt-5" onSubmit={handleSubmit}>
          <h2 className="lg:text-xl text-lg font-semibold">Add a Product</h2>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            onChange={handleChange}
            id="name"
            placeholder="Minimum 3 letters"
            name="productName"
            value={values.productName}
            className="bg-gray-200 w-full capitalize border px-3 lg:text-lg text-base border-black rounded mb-5"
          />
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            onChange={handleChange}
            id="quantity"
            name="quantity"
            value={values.quantity}
            className="bg-gray-200 w-full border px-3 lg:text-lg text-base border-black rounded mb-5"
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            onChange={handleChange}
            id="price"
            name="price"
            value={values.price}
            className="bg-gray-200 w-full border px-3 lg:text-lg text-base border-black rounded mb-3"
          />
          <button
            type="submit"
            className="bg-blue-500 rounded px-3 py-1 text-white hover:bg-blue-700"
          >
            Add Product
          </button>
        </form>

        {/* Displaying existing stock */}
        <h1 className="lg:text-2xl text-lg text-center my-3 font-semibold">
          Current Stock
        </h1>
        <table className="border-collapse w-full bg-red-100 mb-12">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Product Name</th>
              <th className="border border-black px-4 py-2">Quantity</th>
              <th className="border border-black px-4 py-2">Price</th>
            </tr>
          </thead>

          {/* Maping  Existing Stock */}
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td className="border capitalize border-black px-4 py-2">
                  {item.productName}
                </td>
                <td className="border border-black px-4 py-2">
                  {item.quantity}
                </td>
                <td className="border border-black px-4 py-2">₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}