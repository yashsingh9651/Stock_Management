"use client";
import { fetchBills } from "@/slices/apiCallSlice";
import AtomicSpinner from "@/components/AtomicSpinner";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const page = () => {
  // Auntheticated  browser will redirect to he login page.
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(process.env.NEXT_PUBLIC_AUTH_URL);
    },
  });
  // Fetching Bills...
  const dispatch = useDispatch();
  const loadingBills = useSelector((state) => state.apiCall.loadingBills);
  const bills = useSelector((state) => state.apiCall.bills);
  useEffect(() => {
    dispatch(fetchBills());
  }, []);

  return (
    <div className="container mx-auto px-1 lg:px-4 mt-3">
      {!loadingBills?<h1 className="mb-2 text-center text-lg lg:text-xl font-medium">Total Bills: {bills.length}</h1>:<AtomicSpinner />}
      {bills.length>0?bills.map((item)=>{
        return <Link href={`/Bill/${item.billNumber}`} key={item._id} className="flex mb-2 justify-between items-center cursor-pointer hover:bg-gray-200 bg-gray-300 p-2 flex-wrap rounded text-sm lg:text-lg font-medium border border-neutral-600">
        <h1 className="capitalize">Biller: {item.biller}</h1>
        <h1 className="capitalize">Customer: {item.customer}</h1>
        <h1>Bill Number: {item.billNumber}</h1>
        <h1>SubTotal:₹ {item.subTotal}</h1>
        <h1>Date: {item.billingDate}</h1>
      </Link>
      }):<h1 className="text-center lg:text-xl text-lg font-medium">No Bills Generated Yet</h1>}
    </div>
  );
};

export default page;
