import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyLayout = () => {
    const navigate = useNavigate(); 

    const navItems = [
        { name: "Dashboard", path: "/company-dashboard" },
        { name: "Category", path: "/category" },
        { name: "Product", path: "/company/product" },
        { name: "Settings", path: "/company/settings" },
    ];

    return (
        <div className="h-screen flex bg-white">
            <div className="w-64 bg-white text-black p-4 shadow-md">
                <h2 className="text-xl font-bold mb-4">Company</h2>
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index} className="mb-1 p-2 rounded">
                            <button
                                onClick={() => navigate(item.path)} 
                                className="w-full text-left p-2 rounded hover:text-indigo-500"
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex-1 p-8 bg-gray-100">
                <p>Welcome to the company dashboard.</p>
            </div>
        </div>
    );
};

export default CompanyLayout;
