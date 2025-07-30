"use client";

import Image from 'next/image';
import { FaBell } from 'react-icons/fa';
import { FiSearch, FiChevronDown, FiMenu } from 'react-icons/fi';
import user from "@/assets/img/user.jpg";

type NavbarProps = {
  toggleSidebar?: () => void;
};

const Navbar = ({ toggleSidebar }: NavbarProps) => {

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        window.location.href = '/login';
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-4 md:px-6">
      <div className="flex items-center justify-between h-14">

        {/* Left Section */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Mobile Menu Button */}
          <button className="md:hidden cursor-pointer" onClick={toggleSidebar}>
            <FiMenu size={24} className="text-gray-700" />
          </button>

          {/* Logo */}
          <div className="flex flex-col items-start pr-20 leading-tight">
            <h1 className="text-2xl/6 font-bold text-blue-700 tracking-wide">SUNNY</h1>
            <h1 className="text-lg/4 font-medium text-gray-500 tracking-widest">SOLUTIONS</h1>
          </div>

          {/* Sidebar Toggle for Desktop */}
          <button className="hidden md:block ml-4" onClick={toggleSidebar}>
            <FiMenu size={24} className="text-gray-600 hover:text-blue-600 cursor-pointer" />
          </button>

          {/* Search (Desktop only) */}
          <div className="hidden md:flex items-center ml-6">
            <div className="relative w-[240px] lg:w-[320px]">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FiSearch size={18} />
              </span>
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-1.5  border border-gray-200 bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Notification Icon */}
          <button className="p-2 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition hidden md:flex">
            <FaBell size={18} />
          </button>

          {/* User Profile */}
          <div className="hidden md:flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md hover:bg-blue-100 transition">
            <Image
              src={user}
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <h6 className="text-sm font-medium text-gray-700">Aftab Hassan</h6>
            <FiChevronDown size={16} className="text-gray-500" />
          </div>

          {/* Logout Button */}
          <button onClick={handleLogout}
            className="hidden md:flex items-center bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md text-sm font-medium transition cursor-pointer">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
