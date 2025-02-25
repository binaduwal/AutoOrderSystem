import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Layout = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const navItems = [
    "Dashboard",
    "Category",
    "Product",
    "Order",
    "User",
    "Role",
    "Permissions",
    "Register",
    "Settings",
  ];

  const renderNavItem = (item, index, isMobile = false) => {
    if (item === "User") {
      return (
        <li key={index} className="relative">
          <div
            onClick={() => setShowUserDropdown((prev) => !prev)}
            className="flex items-center p-3 rounded-lg transition duration-300 text-gray-700 hover:text-indigo-500 cursor-pointer justify-between"
          >
            <span>{item}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className={`w-4 h-4 transition-transform duration-200 ${
                showUserDropdown ? "transform rotate-90" : ""
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          {/* Dropdown Menu */}
          {showUserDropdown && (
            <ul className="ml-4 mt-1 space-y-1">
              <li>
                <NavLink
                  to="/user"
                  onClick={() => isMobile && setShowMobileSidebar(false)}
                  className="block p-1 rounded-lg transition duration-300 text-gray-700 hover:text-indigo-500"
                >
                  Create New User
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/manage"
                  onClick={() => isMobile && setShowMobileSidebar(false)}
                  className="block p-1 rounded-lg transition duration-300 text-gray-700 hover:text-indigo-500"
                >
                  Manage User
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      );
    } else {
      return (
        <li key={index}>
          <NavLink
            to={
              item === "Register"
                ? "/signup"
                : item === "Permissions"
                ? "/permission"
                : `/${item.toLowerCase()}`
            }
            onClick={() => isMobile && setShowMobileSidebar(false)}
            className={({ isActive }) =>
              `block p-3 rounded-lg transition duration-300 ${
                isActive ? "text-indigo-500 font-semibold" : "text-gray-700 hover:text-indigo-500"
              }`
            }
          >
            {item}
          </NavLink>
        </li>
      );
    }
  };

  return (
    <>
      <div className="flex h-screen bg-white">
        {/* Mobile Sidebar */}
        {showMobileSidebar && (
          <aside className="fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setShowMobileSidebar(false)}
            ></div>
            <div className="relative flex flex-col w-64 bg-white text-black p-6 shadow-lg">
              <div className="text-xl font-bold mb-5 text-gray-700">Admin</div>
              <nav>
                <ul className="space-y-1">
                  {navItems.map((item, index) => renderNavItem(item, index, true))}
                  <li>
                    <a
                      className="flex items-center p-3 rounded-lg transition duration-300 hover:text-indigo-500 text-gray-700"
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
        <aside className="w-64 bg-white text-black p-4 shadow-lg hidden md:block h-full fixed">
          <div className="text-xl font-bold mb-3 text-gray-700">Admin</div>
          <nav>
            <ul className="space-y-1">
              {navItems.map((item, index) => renderNavItem(item, index))}
              <li>
                <a
                  className="flex items-center p-3 rounded-lg transition duration-300 text-gray-700 hover:text-indigo-500"
                  href="#"
                >
                  <PiSignOut className="mr-3 text-xl" /> Signout
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 md:ml-64 p-0 bg-white relative">
          <header className="flex justify-between items-center bg-white p-4 shadow-md md:shadow-none">
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="text-xl text-gray-600 focus:outline-none"
              >
                <HiOutlineMenuAlt3 />
              </button>
            </div>
            <div className="flex items-center space-x-4 ml-auto">
              <IoMdNotificationsOutline className="text-xl text-gray-600" />
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                <FaUser className="text-gray-500 text-lg" />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="mt-0">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
