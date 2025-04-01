import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Swal from "sweetalert2";
import { GrUserAdmin } from "react-icons/gr";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { RiUserSettingsLine } from "react-icons/ri";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { HiX } from "react-icons/hi";

const navItems = [
  { 
    name: "Dashboard",
    path: "/dashboard",
    icon:<TbDeviceDesktopAnalytics className="mr-2 inline-block"/>

  },

  {   
    name: "Company",
    path: "/company",
    icon:<HiOutlineBuildingOffice2 className="mr-2 inline-block"/>
  },
      {   
    name: "User",
    icon:<FaRegUser className="mr-2 inline-block"/>,

    submenu: [
      {   
        name: "Create New User",
        path: "/user"
       },
              {   
                name: "Manage User",
                path: "/manage" 
              },
            ],
  },

    {   
    name: "Role",
    path: "/role",
    icon:<RiUserSettingsLine className="mr-2 inline-block"/>
  },

      {   
    name: "Permissions",
    path: "/permission",
    icon: <GrUserAdmin className="mr-2 inline-block" />
  },

      {   
    name: "Settings",
    path: "/settings",
    icon:<IoSettingsOutline className="mr-2 inline-block"/>

  },
    ];

const Layout = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out of your account!",
      showCancelButton: true,
      confirmButtonText: "Yes, sign out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem('admin');

        Swal.fire("Signed Out!", "You have been signed out.", "success");
        navigate("/");
      }
    });
  };

  const renderNavItem = (item, index, isMobile = false) => {
    if (item.submenu) {
      return (
        <li key={index} className="relative">
          <div
            onClick={() => setShowUserDropdown((prev) => !prev)}
            className="flex items-center p-2 rounded-lg transition duration-300 text-gray-700 hover:text-indigo-500 cursor-pointer justify-between"
          >
            <span>
              {item.icon}
              {item.name}
              </span>
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
          {showUserDropdown && (
            <ul className="ml-4 mt-1 space-y-1">
              {item.submenu.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <NavLink
                    to={`/admin${subItem.path}`}
                    onClick={() => isMobile && setShowMobileSidebar(false)}
                    className="block p-1 rounded-lg transition duration-300 text-gray-700 hover:text-indigo-500"
                  >
                    {subItem.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    } else {
      return (
        <li key={index}>
          <NavLink
            to={`/admin${item.path}`}
            onClick={() => isMobile && setShowMobileSidebar(false)}
            className={({ isActive }) =>
              `block p-3 rounded-lg transition duration-300 ${
                isActive ? "text-indigo-500 font-semibold" : "text-gray-700 hover:text-indigo-500"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        </li>
      );
    }
  };
      
  return (
    <div className="flex h-screen bg-white">
      {showMobileSidebar && (
        <aside className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowMobileSidebar(false)}></div>
          <div className="relative flex flex-col w-64 bg-white text-black p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-bold mb-2 text-gray-700">Admin</div>
        <button
          onClick={() => setShowMobileSidebar(false)}
          className="p-1 rounded-lg hover:bg-gray-100 text-gray-600"
        >
          <HiX className="text-2xl" />
        </button>
      </div>
            <nav>
              <ul className="space-y-1">
                {navItems.map((item) => renderNavItem(item, true))}
                <li>
                  <button onClick={handleSignOut} className="flex items-center p-2 rounded-lg text-gray-700 hover:text-indigo-500">
                    <PiSignOut className="mr-3 text-xl" /> Signout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      )}

      <aside className="w-64 bg-white text-black p-4 shadow-lg hidden md:block h-full fixed">
        <div className="text-xl font-bold mb-2 text-gray-700">Admin</div>
        <nav>
          <ul className="space-y-0">
          {navItems.map((item, index) => renderNavItem(item, index))}
            <li>
              <button onClick={handleSignOut} className="flex items-center p-2 rounded-lg text-gray-700 hover:text-indigo-500">
                <PiSignOut className="mr-3 text-xl" /> Signout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 md:ml-64 p-0 bg-white relative">
        <header className="flex justify-between items-center bg-white p-4 shadow-md md:shadow-none">
          <button onClick={() => setShowMobileSidebar(true)} className="text-xl text-gray-600 md:hidden">
            <HiOutlineMenuAlt3 />
          </button>
          <div className="flex items-center space-x-4 ml-auto">
            <IoMdNotificationsOutline className="text-xl text-gray-600" />
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
              <FaUser className="text-gray-500 text-lg" />
            </div>
          </div>
        </header>

        <div className="mt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
