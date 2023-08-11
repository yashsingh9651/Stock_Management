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
  // Fetching Bill Details...
  const [clientBillingProducts, setClientBillingProducts] = useState([]);
  const fetching = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/bill`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.slug),
    });
    const res = await response.json();
    setClientBillingProducts(res);
  }
  useEffect(() => {
    fetching();
  }, [])
  
  return (
    <div className="lg:px-4 px-2 mt-2 border border-black rounded bg-slate-200">
          <div className="flex justify-between items-center mt-2">
            <h1 className="capitalize text-lg font-medium">
              Biller: yash singh
            </h1>
            <h1  className="capitalize text-lg font-medium">Customer Name:Yash singh</h1>
            <h1 className="capitalize text-lg font-medium">Bill Number:3</h1>
          </div>
          <table className="border-collapse w-full bg-red-100 mb-10 mt-2">
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
              {clientBillingProducts.map((item) => (
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
          <h1 className="text-right text-lg font-medium">
            {/* SubTotal :₹{subTotal} */}
            SubTotal :₹27878
          </h1>
        </div>
  )
}