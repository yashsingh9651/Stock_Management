"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useSession, signIn, signOut } from "next-auth/react";
const Header = () => {
  const session = useSession();
  const [showProfile, setShowProfile] = useState(false);
  if (session.data) {
    return (
      <header className="text-gray-500 shadow-md relative mx-auto body-font container">
        <div className="container mx-auto justify-between flex flex-wrap px-4 py-2 flex-col md:flex-row items-center">
          <Link
            title="Home"
            href={"/"}
            className="title-font font-medium mb-4 md:mb-0"
          >
            <Image priority src="/logo.png" width={110} height={70} alt="logo" />
          </Link>
          <div className="flex">
            {showProfile && (
              <div className="rounded absolute top-16 w-2/12 bg-slate-200 border border-black text-black z-50">
                <h1 className="text-lg font-medium p-2 capitalize">
                  {session?.data?.user?.email?.slice(0, 11)}
                </h1>
                <h1
                  onClick={() => signOut()}
                  title="SignOut"
                  className="flex p-2 cursor-pointer border-t border-black font-medium hover:bg-slate-400 text-lg justify-between items-center mt-1"
                >
                  Sign Out
                  <div className="text-xl">
                    <FaSignInAlt />
                  </div>
                </h1>
              </div>
            )}
            <CgProfile
            title="Profile"
              className="text-3xl mr-2 hover:text-black"
              onClick={() => setShowProfile(!showProfile)}
            />
            <nav className="flex flex-wrap items-center text-xl justify-center">
              <Link href={"/BillHistory"} className="mr-5 hover:text-black">
                Bill History
              </Link>
              <Link href={"/CreateBill"} className="mr-5 hover:text-black">
                Create Bill
              </Link>
              <Link href={"/Restock"} className="mr-5 hover:text-black">
                Restock
              </Link>
              <Link href={"/RestockBills"} className="mr-5 hover:text-black">
                Restock Bill
              </Link>
            </nav>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="text-gray-500 relative mx-auto body-font container">
      <div className="container mx-auto justify-between flex flex-wrap px-4 py-2 flex-col md:flex-row items-center">
        <Link
          title="Home"
          href={"/"}
          className="title-font font-medium mb-4 md:mb-0"
        >
          <Image src="/logo.png" width={110} height={70} alt="logo" />
        </Link>
        <nav className="flex flex-wrap items-center text-xl justify-center">
          <div>
            <CgProfile
            title="Sign In"
                className="text-3xl mr-2 cursor-pointer hover:text-black"
                onClick={() => signIn()}
              />
          </div>
          <Link href={"/BillHistory"} className="mr-5 hover:text-black">
            Bill History
          </Link>
          <Link href={"/CreateBill"} className="mr-5 hover:text-black">
            Create Bill
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
