"use client";
import React from "react";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
const page = () => {
  // Handleing Formik, Yup and sending credentials ....
  const data = {
    email: "",
    password: "",
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: data,
    onSubmit: async (values, action) => {
      action.resetForm();
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/",
      });
    },
  });
  return (
    <>
      <ToastContainer/>
    <section className="text-gray-600 body-font">
      <div className="container px-5 lg:py-24 pt-5 pb-3 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-12 lg:pr-0 pr-0">
          <h1 className="title-font capitalize font-medium lg:text-xl text-base text-gray-900">
            one & only a simple option to make your bussiness super easy. by creating bill and access to all your previous bills and keeping an eye on your inventory.
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Sign In
          </h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              onChange={handleChange}
              value={values.email}
              type="email"
              required
              id="email"
              placeholder="Enter Your Awesome Email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">
              Password
            </label>
            <input
              onChange={handleChange}
              value={values.password}
              required
              placeholder="Enter Your Awesome Sign In Key"
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Sign In
          </button>
          <Link href="/SignUp" className="text-center mt-2 text-blue-400 hover:text-blue-600">Create New Account</Link>
        </form>
      </div>
    </section>
    </>
  );
};
export default page;
