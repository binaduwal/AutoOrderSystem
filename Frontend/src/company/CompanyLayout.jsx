import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { PiSignOut } from 'react-icons/pi';
import { LuRoute } from 'react-icons/lu';
import { PiCurrencyCircleDollar } from 'react-icons/pi';
import { FaPeopleGroup, FaRegUser, FaBoxOpen } from 'react-icons/fa6';
import { TbDeviceDesktopAnalytics } from 'react-icons/tb';
import { LuNotebookPen } from 'react-icons/lu';
import { IoPeopleOutline } from 'react-icons/io5';
import { FiMenu, FiX } from 'react-icons/fi';

const CompanyLayout = () => {
    const navigate = useNavigate();
    const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isSidebarOpen]);

    const handleSignOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be signed out of your account!',
            showCancelButton: true,
            confirmButtonText: 'Yes, sign out!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('userRole');
                localStorage.removeItem('companyId');
                Swal.fire('Signed Out!', 'You have been signed out.', 'success')
                    .then(() => navigate('/login'));
            }
        });
    };

    const navItems = [
        { name: 'Dashboard',
             path: '/company',
             icon: <TbDeviceDesktopAnalytics /> 
        },
        
        { name: 'Category',
             path: '/company/category',
             icon: <MdOutlineDashboardCustomize /> 
        },
        
        {
            name: 'Product',
            
            hasDropdown: true,
            
            icon: <FaBoxOpen />,
            
            subItems: [
                { name: 'Create Product',
                     path: '/company/product' 
                },
                
                { name: 'Product Unit',
                     path: '/company/unit-list' 
                },
                
            ],
            
        
    },
                
        { name: 'Sign Out',
             action: handleSignOut,
             icon: <PiSignOut /> 
        },
        
        { name: 'Payment',
             path: '/company/payment',
             icon: <PiCurrencyCircleDollar /> 
        },
        
        { name: 'Route',
             path: '/company/route',
             icon: <LuRoute /> 
        },
        
        { name: 'Party Group',
             path: '/company/partygroup',
             icon: <FaPeopleGroup /> 
        },
        
        { name: 'Salesperson',
             path: '/company/salesperson',
             icon: <FaRegUser /> 
        },
        
        { name: 'Order',
             path: '/company/order',
             icon: <LuNotebookPen /> 
        },
        
        { name: 'Party',
             path: '/company/party',
             icon: <IoPeopleOutline /> 
        },
        
    ];

    return (
        <div className="h-screen flex flex-col md:flex-row bg-white relative">
            {/* Mobile Sidebar Toggle */}
            <button
                className="md:hidden p-4 text-xl focus:outline-none"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed md:relative top-0 left-0 w-64 bg-white text-black p-4 shadow-md flex flex-col justify-between transition-transform duration-300 ease-in-out z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="flex justify-between items-center pb-1">
                    <h2 className="text-xl font-bold">Company</h2>
                    <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                        <FiX className="text-xl" />
                    </button>
                </div>
                <ul className="mt-3">
                    {navItems.map((item, index) => (
                        <li key={index} className="mt-4 rounded">
                            {item.hasDropdown ? (
                                <>
                                    <button
                                        onClick={() => setProductDropdownOpen(!isProductDropdownOpen)}
                                        className="w-full text-left p-2 rounded hover:text-indigo-500 flex items-center gap-2"
                                    >
                                        {item.icon} {item.name} {isProductDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                    </button>
                                    {isProductDropdownOpen && (
                                        <ul className="ml-4 border-l border-gray-300 pl-2 mt-1">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <li key={subIndex} className="mb-1">
                                                    <button
                                                        onClick={() => { navigate(subItem.path); setSidebarOpen(false); }}
                                                        className="w-full text-left p-2 rounded hover:text-indigo-500 flex items-center gap-2"
                                                    >
                                                        {subItem.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : item.path ? (
                                <button
                                    onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                                    className="w-full text-left p-2 rounded hover:text-indigo-500 flex items-center gap-2"
                                >
                                    {item.icon} {item.name}
                                </button>
                            ) : (
                                <button
                                    onClick={item.action}
                                    className="w-full text-left p-2 rounded hover:text-indigo-500 flex items-center gap-2"
                                >
                                    {item.icon} {item.name}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-transparent bg-opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <div className="flex-1 p-4 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default CompanyLayout;
