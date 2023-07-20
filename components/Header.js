 import React from 'react'
 import Image from "next/image";
 const Header = () => {
   return (
    <header className="text-gray-600 mx-auto body-font container">
    <div className="container mx-auto flex flex-wrap px-4 py-2 flex-col md:flex-row items-center">
      <a className="title-font font-medium mb-4 md:mb-0">
        <Image src="/logo.png" width={110} height={70} alt="logo" />
      </a>
      <nav className="md:ml-auto flex flex-wrap items-center text-xl justify-center">
        <a className="mr-5 hover:text-gray-900">Bill History</a>
        <a className="mr-5 hover:text-gray-900">Create Bill</a>
      </nav>
    </div>
  </header>
   )
 }
 export default Header;