import React, { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Swal from 'sweetalert2'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

const CompanyLayout = () => {
    const navigate = useNavigate()
    const [isProductDropdownOpen, setProductDropdownOpen] = useState(false)
    const [isCreateProductDropdownOpen, setCreateProductDropdownOpen] = useState(false)

    const handleSignOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be signed out of your account!",
            showCancelButton: true,
            confirmButtonText: 'Yes, sign out!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem("token")
                sessionStorage.removeItem("userRole")
                localStorage.removeItem("companyId")
                Swal.fire('Signed Out!', 'You have been signed out.', 'success')
                    .then(() => navigate("/login"))
            }
        })
    }

    const navItems = [
        {
            name: "Dashboard",
            path: "/company" 
        },

        {
            name: "Category",
            path: "/company/category" 
        },

        { 
            name: "Product", 
            hasDropdown: true, 
            subItems: [
                { 
                    name: "Create Product",
                    path: "/company/product" 
                },

                {
                    name: "Product Unit",
                    path: "/company/unit-list" 
                },

            ]
        },
        {
            name: "Settings", 
            path: "/company/settings" 
        },

        {
            name: "Sign Out", 
            action: handleSignOut 
        },

        {
            name:"Payment",
            path:"/company/payment"
        },
        {
            name:"Route",
            path:"/company/route"
        },
        {
            name:"Party Group",
            path:"/company/partygroup"
        },
        {
            name:"Salesperson",
            path:"/company/salesperson"
        },


    ]

    return (
        <div className="h-screen flex bg-white">
            <div className="w-64 bg-white text-black p-4 shadow-md flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-4">Company</h2>
                    <ul>
                        {navItems.map((item, index) => (
                            <li key={index} className="mb-1 p-1 rounded">
                                {item.hasDropdown ? (
                                    <>
                                        <button
                                            onClick={() => setProductDropdownOpen(!isProductDropdownOpen)}
                                            className="w-full text-left p-2 rounded hover:text-indigo-500 flex items-center gap-1"
                                        >
                                            {item.name} {isProductDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                        </button>

                                        {isProductDropdownOpen && (
                                            <ul className="ml-4 border-l border-gray-300 pl-2 mt-1">
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <li key={subIndex} className="mb-1">
                                                        {subItem.hasDropdown ? (
                                                            <>
                                                                <button
                                                                    onClick={() => setCreateProductDropdownOpen(!isCreateProductDropdownOpen)}
                                                                    className="w-full text-left p-2 rounded hover:text-indigo-500 flex items-center gap-1"
                                                                >
                                                                    {subItem.name} {isCreateProductDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                                </button>
                                                                
                                                                {isCreateProductDropdownOpen && (
                                                                    <ul className="ml-4 border-l border-gray-300 pl-2 mt-1">
                                                                        {subItem.subItems.map((innerItem, innerIndex) => (
                                                                            <li key={innerIndex} className="mb-1">
                                                                                <button
                                                                                    onClick={() => navigate(innerItem.path)}
                                                                                    className="w-full text-left p-2 rounded hover:text-indigo-500"
                                                                                >
                                                                                    {innerItem.name}
                                                                                </button>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <button
                                                                onClick={() => navigate(subItem.path)}
                                                                className="w-full text-left p-2 rounded hover:text-indigo-500"
                                                            >
                                                                {subItem.name}
                                                            </button>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : item.path ? (
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
                    </ul>
                </div>
            </div>

            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    )
}

export default CompanyLayout
