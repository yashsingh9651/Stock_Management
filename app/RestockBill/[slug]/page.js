"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
export default function Page({ params }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(process.env.NEXT_PUBLIC_AUTH_URL);
    },
  });
  // Fetching Bill History Products...
  const [billHistProd, setBillHistProd] = useState([]);
  const fetchingProducts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getRestockBillProducts`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.slug),
    });
    const res = await response.json();
    setBillHistProd(res);
  }
  // Fetching Biller name, Customer Name and SubTotal Amount.... 
  const [billingDetails, setBillingDetails] = useState({});
  const fetchingBillDetail = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getRestockBill`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.slug),
    });
    const res = await response.json();
    setBillingDetails(res);
  }
  useEffect(() => {
    fetchingProducts();
    fetchingBillDetail();
  }, [])
  
  return (
    <div className="container lg:px-8 px-3 mx-auto mt-10">
      <div className="lg:px-5 px-2 mt-2 border border-black rounded bg-slate-200">
            <div className="flex justify-between items-center mt-2">
              <h1 className="capitalize text-lg font-medium">
                Biller: {billingDetails.biller}
              </h1>
              <h1  className="capitalize text-lg font-medium">Customer: {billingDetails.customer}</h1>
              <h1 className="capitalize text-lg font-medium">Bill Number:{billingDetails.billNumber}</h1>
              <h1 className="capitalize text-lg font-medium">Date:{billingDetails.billingDate}</h1>
            </div>
            <table className="border-collapse w-full bg-gray-300 my-2">
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
                {billHistProd.map((item) => (
                  <tr key={item._id}>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h1 className="text-right mb-2 text-lg font-medium">
              SubTotal :₹{billingDetails.subTotal}
            </h1>
          </div>
    </div>
  )
}