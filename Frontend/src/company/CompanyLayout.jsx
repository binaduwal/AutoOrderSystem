import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CompanyLayout = () => {
    const navigate = useNavigate(); 

    const handleSignOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be signed out of your account!",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, sign out!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token"); 
                sessionStorage.removeItem("user"); 
                Swal.fire('Signed Out!', 'You have been signed out.', 'success')
                .then(() => {
                    navigate("/login"); 
                });
            }
        });
    };

    const navItems = [
        { name: "Dashboard", path: "/company/dashboard" },
        { name: "Category", path: "/company/dashboard/category" },
        { name: "Product", path: "/company/dashboard/product" },
        { name: "Settings", path: "/company/dashboard/settings" },
        { name: "Sign Out", action: handleSignOut }
    ];


    return (
        <div className="h-screen flex bg-white">
            <div className="w-64 bg-white text-black p-4 shadow-md flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-4">Company</h2>
                    <ul>
                    {navItems.map((item, index) => (
                        <li key={index} className="mb-1 p-2 rounded">
                            {item.path ? (
                                <button
                                    onClick={() => navigate(item.path)}
                                    className="w-full text-left p-2 rounded hover:text-indigo-500"
                                >
                                    {item.name}
                                </button>
                            ) : (
                                <button
                                    onClick={item.action}
                                    className="w-full text-left p-2 rounded hover:text-indigo-500"
                                >
                                    {item.name}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>                </div>

            </div>

        </div>
    );
};

export default CompanyLayout;
