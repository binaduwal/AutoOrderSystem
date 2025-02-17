import React from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white-900 text-black p-5">
        <div className="text-xl font-bold mb-6 text-black-400">Admin</div>
        <nav>
          <ul className="space-y-2" >
            {['Dashboard', 'Category','Product', 'Order', 'User', 'Role', 'Permissions', 'Register','Settings'].map((item, index) => (
              <li key={index}>
                <a 
                  className={`flex items-center p-2 rounded transition ${
                    item === 'Dashboard' ? 'text-blue-400' : 'hover:bg-gray-300'
                  }`} 
                  href="#"
                >
                  {item}
                </a>
              </li>
            ))}

            <li>
              <a 
                className="flex items-center p-2 rounded transition hover:bg-gray-300 "
                href="#"
              >
                <PiSignOut className="mr-2 text-xl" /> Signout
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-4 shadow rounded-md">
          <div className="relative w-1/3">
            <input
              type="search"
              placeholder="Search"
              className="p-2 pl-10 border rounded-2xl w-full focus:outline-none focus:ring-1 focus:ring-black-100"
            />
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-2xl text-gray-600"><IoMdNotificationsOutline /></span>
            <div className="w-10 h-10 rounded-full border flex items-center justify-center bg-gray-200 relative">
              <img 
                src="#" 
                alt="User Avatar" 
                className="w-full h-full rounded-full" 
              />
              <FaUser className="absolute text-gray-500 text-lg" />
            </div>
          </div>
        </header>
      </main>
    </div>
  );
};

export default Dashboard;
