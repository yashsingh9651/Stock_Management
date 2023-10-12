"use client";
import { useFormik } from "formik";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { Schema } from "../schema/user";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
const page = () => {
    // Auntheticated  browser will redirect to he login page.
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect(process.env.NEXT_PUBLIC_AUTH_URL);
  //   },
  // });
  // Handleing Formik, Yup and dispatching action to add product ....
  const data = {
    username: "",
    email: "",
    password: "",
    cPassword: "",
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: data,
    validationSchema: Schema,
    onSubmit: async (values, action) => {
      if (values.password === values.cPassword) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const res = await response.json();
        if (res.ok) {
          toast.success(
            "Registartion Successfully Now Login with Credentials",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          action.resetForm();
        } else {
          toast.error(res.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          action.resetForm();
        }
      } else {
        toast.warning("Password and Confirm Password Should be Shame", {
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
    },
  });
  return (
    <>
      <ToastContainer />
        <div className="container px-5 md:py-16 py-2 mx-auto text-gray-600 body-font flex flex-wrap items-center">
          <form
            onSubmit={handleSubmit}
            className="lg:w-2/6 mx-auto md:w-1/2 bg-gray-100 rounded-lg p-8 border shadow-md border-black flex flex-col w-full"
          >
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Sign Up
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="username"
                className="leading-7 text-sm text-gray-600"
              >
                username
              </label>
              <input
                value={values.username}
                onChange={handleChange}
                type="text"
                id="username"
                name="username"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                value={values.email}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                value={values.password}
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="cPassword"
                className="leading-7 text-sm text-gray-600"
              >
                Confirm Password
              </label>
              <input
                value={values.cPassword}
                onChange={handleChange}
                type="password"
                id="cPassword"
                name="cPassword"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Sign Up
            </button>
            <Link
            href="/SignIn"
              className="text-white text-center mt-5 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Sign In
            </Link>
          </form>
        </div>
    </>
  );
};
export default page;
