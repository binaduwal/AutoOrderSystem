import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { HiOutlineMenuAlt3 } from "react-icons/hi"; 

const Dashboard = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="flex h-full bg-gray-100">
      {/* Mobile Sidebar */}
      {showMobileSidebar && (
        <aside className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setShowMobileSidebar(false)}
          ></div>
          <div className="relative flex flex-col w-64 bg-gray-900 text-white p-6">
            <div className="text-2xl font-bold mb-7 text-blue-400">Admin</div>
            <nav>
              <ul className="space-y-2">
                {['Dashboard', 'Category', 'Product', 'Order', 'User', 'Role', 'Permissions', 'Register', 'Settings'].map((item, index) => (
                  <li key={index}>
                    <Link
                      className={`flex items-center p-3 rounded-lg transition duration-300 ${
                        item === 'Dashboard'
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-blue-500 text-gray-300'
                      }`}
                      to={item === 'Register' ? '/signup' : item === 'Permissions' ? '/permission' : '#'}
                      onClick={() => setShowMobileSidebar(false)}
                    >
                      <span className="ml-2">{item}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    className="flex items-center p-3 rounded-lg transition duration-300 hover:bg-blue-500 text-gray-300"
                    href="#"
                  >
                    <PiSignOut className="mr-3 text-xl" /> Signout
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      )}

      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-gray-900 text-white p-6 shadow-lg hidden md:block">
        <div className="text-2xl font-bold mb-7 text-blue-400">Admin</div>
        <nav>
          <ul className="space-y-2">
            {['Dashboard', 'Category', 'Product', 'Order', 'User', 'Role', 'Permissions', 'Register', 'Settings'].map((item, index) => (
              <li key={index}>
                <Link
                  className={`flex items-center p-3 rounded-lg transition duration-300 ${
                    item === 'Dashboard'
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-blue-500 text-gray-300'
                  }`}
                  to={item === 'Register' ? '/signup' : item === 'Permissions' ? '/permission' : '#'}
                >
                  <span className="ml-2">{item}</span>
                </Link>
              </li>
            ))}
            <li>
              <a
                className="flex items-center p-3 rounded-lg transition duration-300 hover:bg-blue-500 text-gray-300"
                href="#"
              >
                <PiSignOut className="mr-3 text-xl" /> Signout
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        <header className="flex justify-between items-center bg-white p-4 shadow rounded-md">
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="text-2xl text-gray-600 focus:outline-none"
            >
              <HiOutlineMenuAlt3 />
            </button>
          </div>
          <div className="relative w-full md:w-1/3">
            <input
              type="search"
              placeholder="Search"
              className="p-2 pl-10 border rounded-2xl w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-2xl text-gray-600">
              <IoMdNotificationsOutline />
            </span>
            <div className="w-10 h-10 rounded-full border flex items-center justify-center bg-gray-200">
              <FaUser className="text-gray-500 text-lg" />
            </div>
          </div>
        </header>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Welcome to the Dashboard </h2>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
