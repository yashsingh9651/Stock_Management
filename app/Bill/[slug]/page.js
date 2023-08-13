"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getBillProducts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params.slug),
      }
    );
    const res = await response.json();
    setBillHistProd(res);
  };
  // Fetching Biller name, Customer Name and SubTotal Amount....
  const [billingDetails, setBillingDetails] = useState({});
  const fetchingBillDetail = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getBill`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params.slug),
      }
    );
    const res = await response.json();
    setBillingDetails(res);
  };
  useEffect(() => {
    fetchingProducts();
    fetchingBillDetail();
  }, []);
  // Converting html page to pdf format and Download pdf...
  const pdfRef = useRef();
  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 20;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`Bill Number-${billingDetails.billNumber}`);
    });
  };
  // Converting html page to pdf format and Printing it...
  const printPdf = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: `Bill Number-${billingDetails.billNumber}`,
  });
  return (
    <div className="container lg:px-8 px-3 mx-auto mt-10">
      <div
        ref={pdfRef}
        className="lg:px-5 px-2 mt-2 border border-black rounded bg-slate-200"
      >
        <h1 className="text-center underline underline-offset-4 p-2 text-xl font-medium">
          Akanksha Enterprises
        </h1>
        <div className="flex justify-between items-center mt-2">
          <h1 className="capitalize text-lg font-medium">
            Biller: {billingDetails.biller}
          </h1>
          <h1 className="capitalize text-lg font-medium">
            Customer: {billingDetails.customer}
          </h1>
          <h1 className="capitalize text-lg font-medium">
            Bill Number:{billingDetails.billNumber}
          </h1>
          <h1 className="capitalize text-lg font-medium">
            Date:{billingDetails.billingDate}
          </h1>
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
                <td className="border border-black px-4 py-2">₹{item.price}</td>
                <td className="border border-black px-4 py-2 relative">
                  ₹{item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1 className="text-right pb-3 text-lg font-medium">
          SubTotal :₹{billingDetails.subTotal}
        </h1>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => downloadPdf()}
          className="bg-blue-500 shadow-lg mr-4 hover:shadow-md shadow-black rounded border-2 border-black px-2 text-lg disabled:bg-blue-300 disabled:border py-1 mt-2 text-white hover:bg-blue-700"
        >
          Download Bill
        </button>
        <button
          onClick={() => printPdf()}
          className="bg-blue-500 shadow-lg hover:shadow-md shadow-black rounded border-2 border-black px-2 text-lg disabled:bg-blue-300 disabled:border py-1 mt-2 text-white hover:bg-blue-700"
        >
          Print Bill
        </button>
      </div>
    </div>
  );
}
