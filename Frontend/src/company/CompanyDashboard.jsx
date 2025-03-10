import React,{useState} from 'react';

const CompanyDashboard = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const navItems = [
    "Dashboard",
    "Category",
    "Product",
    "Settings",
  ];

  return (
    <div className="h-screen flex bg-white">
      <div className="w-64 bg-white text-black p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Company</h2>
        <ul>
        {navItems.map((item, index) => (
       <li key={index} className="mb-1 p-2 rounded">
          <button
                onClick={() => setActiveItem(item)} 
                className={`w-full text-left p-2 rounded ${
                  activeItem === item ? "text-indigo-600 font-bold" : "text-black-700 hover:text-indigo-500"
                }`}
              >
                {item}
              </button>
               </li>
))}
        </ul>
      </div>

      <div className="flex-1 p-8 bg-white text-black">
        <h1 className="text-3xl font-semibold mb-4">Welcome to the Company Dashboard!</h1>
      </div>
    </div>
  );
};

export default CompanyDashboard;
