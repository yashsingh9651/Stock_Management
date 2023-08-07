"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useSession,signIn,signOut } from "next-auth/react";
const Header = () => {
  const session = useSession();
  const [showProfile, setShowProfile] = useState(false);
  if (session.status ==='authenticated'){
    return (
      <header className="text-gray-500 relative mx-auto body-font container">
        <div className="container mx-auto justify-between flex flex-wrap px-4 py-2 flex-col md:flex-row items-center">
          <Link title="Home" href={'/'} className="title-font font-medium mb-4 md:mb-0">
            <Image src="/logo.png" width={110} height={70} alt="logo" />
          </Link>
          <div className="flex">
            {showProfile&&<h1 className="text-black text-lg mr-2 font-semibold">{session?.data?.user?.email}</h1>}
            <CgProfile className="text-4xl mr-2 hover:text-black" onMouseEnter={()=>setShowProfile(true)} onMouseLeave={()=>setShowProfile(false)} />
            <nav className="flex flex-wrap items-center text-xl justify-center">
              <Link href={"/BillHistory"} className="mr-5 hover:text-black">Bill History</Link>
              <Link href={"/CreateBill"} className="mr-5 hover:text-black">Create Bill</Link>
              <button title="SignOut" onClick={()=>signOut()} className="mr-5 hover:text-black"><FaSignInAlt/></button>
            </nav>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="text-gray-500 relative mx-auto body-font container">
      <div className="container mx-auto flex flex-wrap px-4 py-2 flex-col md:flex-row items-center">
        <Link title="Home" href={'/'} className="title-font font-medium mb-4 md:mb-0">
          <Image src="/logo.png" width={110} height={70} alt="logo" />
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-xl justify-center">
          <Link href={"/BillHistory"} className="mr-5 hover:text-black">Bill History</Link>
          <Link href={"/CreateBill"} className="mr-5 hover:text-black">Create Bill</Link>
          <button title="SignIn" onClick={()=>signIn()} className="mr-5 hover:text-black rotate-180"><FaSignInAlt/></button>
        </nav>
      </div>
    </header>
  );
};
export default Header;
