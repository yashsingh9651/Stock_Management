"use client"
import Header from "@/components/Header";
import { useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Schema } from "./schema";
import { useFormik } from "formik";
import Loader from "@/components/Loader";
export default function Home() {
const [loading, setLoading] = useState(false);
  // Displaying search result on typing in search field ....
  const [query, setQuery] = useState("");
  const [dropdown, setDropdown] = useState([]);
  const dropdownEdit = async (e) => {
  setQuery(e.target.value)
  if(query.length>=2){
    setLoading(true);
    setDropdown([]);
    const response = await fetch('/api/search?query='+query)
    let rjson = await response.json();
    setDropdown(rjson.products);
    setLoading(false);
  }else{
    setDropdown([]);
  }
}

  //  Fetching Products...
  const [products,setProducts ] = useState([]);
  const fetchProduct = async () => {
    const response = await fetch('/api/product')
    let rjson = await response.json();
    setProducts(rjson.products);
  }
  useEffect(() => {
    fetchProduct();
  }, [])

  // Handleing Formik and Yup ....
  const data = {
    productName: "",
    quantity: "",
    price: "",
  };
  const {values,handleChange,handleSubmit} =
    useFormik({
      initialValues: data,
      validationSchema: Schema,
      onSubmit: async (values, action) => {
        const response = await fetch('/api/product',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        if (response.ok){
          toast.success("Product Added Successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }else{
          toast.error("Internal Server Error",{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        }
        fetchProduct();
        action.resetForm();
      },
    });
  return (
    <>
      <Header />
      <ToastContainer/>
      <div className="container mx-auto px-10">
        {/* Search Products */}
        <h1 className="text-xl font-semibold mt-8">Search Producds</h1>
        <div className="flex">
          <input
            type="text"
            id="search"
            className="bg-gray-200 border capitalize text-lg flex-1 border-black rounded-l-md px-3 py-1"
            placeholder="Enter product name"
            onChange={dropdownEdit}
          />
          <select className="bg-gray-200 border border-black rounded-r-md px-2">
            <option value="product1">All</option>
            <option value="product1">Product 1</option>
            <option value="product2">Product 2</option>
          </select>
        </div>
        
          {/* Displaying Dropdown Products */}
          {loading&&<Loader/>}
        <div className="absolute lg:w-4/5 xl:w-3/4 bg-white">
          {dropdown.map((item) => {
            return<div key={item._id} className="container my-1 flex justify-between text-lg bg-gray-200 px-4 rounded border border-gray-400 hover:bg-gray-300">
              <h1 className="capitalize">{item.productName}</h1>
              <h1>{item.quantity}</h1>
              <h1>₹{item.price}</h1>
            </div>
          })}
        </div>

        {/* Adding product */}
        <form className="mt-5" onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold">Add a Product</h2>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            onChange={handleChange}
            id="name"
            placeholder="Minimum 3 letters"
            name="productName"
            value={values.productName}
            className="bg-gray-200 w-full capitalize border px-3 text-lg border-black rounded mb-5"
            />
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            onChange={handleChange}
            id="quantity"
            name="quantity"
            value={values.quantity}
            className="bg-gray-200 w-full border px-3 text-lg border-black rounded mb-5"
            />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            onChange={handleChange}
            id="price"
            name="price"
            value={values.price}
            className="bg-gray-200 w-full border px-3 text-lg border-black rounded mb-3"
          />
          <button type="submit" className="bg-blue-500 rounded px-3 py-1 text-white hover:bg-blue-700">
            Add Product
          </button>
        </form>

        {/* Displaying existing stock */}
        <h1 className="text-2xl text-center my-3 font-semibold">Current Stock</h1>
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
            {products.map((item)=> <tr key={item._id}>
              <td className="border capitalize border-black px-4 py-2">{item.productName}</td>
              <td className="border border-black px-4 py-2">{item.quantity}</td>
              <td className="border border-black px-4 py-2">₹{item.price}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}