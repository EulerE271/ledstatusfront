import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <Link to="/">
        <span className="font-semibold text-xl tracking-tight">Ledstatus</span>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="flex items-center px-3 py-2 border rounded text-black border-teal-400 hover:text-black hover:border-black"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className={`w-full block ${isOpen ? '' : 'hidden'} lg:flex lg:items-center lg:w-auto`}>
        <div className="text-sm lg:flex-grow">
          <a
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-4"
          >
            Hem
          </a>
          <a
            href="/trails"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-4"
          >
            Vandringsleder
          </a>
        </div>
        <div>
          <a href="/" className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black  hover:text-teal-500 hover:bg-white  mt-4 lg:mt-0">Sök leder</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
