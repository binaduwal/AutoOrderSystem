
import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { IoMdCloseCircleOutline } from "react-icons/io"
import CityForm from './CityForm'
import EditCity from './EditCity'

const CityTable = () => {
const [cities, setCity] = useState([])
const [showCity, setShowCity] = useState(false)
const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
const [permissionToDelete, setPermissionToDelete] = useState(null)
const [showEdit, setShowEdit] = useState(false)
const [editCityData, setEditCityData] = useState(null)
    
const handleEdit = (cities) => {
setEditCityData(cities)
setShowEdit(true)
}

useEffect(() => {
const fetchDetails = async () => {
    try {
    const response = await fetch("http://localhost:5000/city/all")
    if (response.ok) {
        const data = await response.json()
        setCity(data)
    } else {
        console.error("Failed to fetch details")
    }
    }
    catch (error) {
    console.error("Error fetching details:", error)
    }
}

fetchDetails()
}, [])

const handleDelete = async () => {
if (permissionToDelete) {
    try {
    const response = await fetch(`http://localhost:5000/city/delete/${permissionToDelete._id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        setCity(cities.filter((p) => p._id !== permissionToDelete._id))
        console.log('City deleted successfully')
    }
        else {
        console.error('Failed to delete')
    }
    }
    catch (error) {
    console.error('Error deleting:', error)
    }
    setShowDeleteConfirmation(false)
}
}

const confirmDelete = (cities) => {
setPermissionToDelete(cities)
setShowDeleteConfirmation(true)
}

const handleCreated = async () => {
try {
    const response = await fetch("http://localhost:5000/city/all");
    if (response.ok) {
        const data = await response.json();
        setCity(data);
    } else {
        console.error("Failed to fetch updated cities");
    }
}
    catch (error) {
    console.error("Error fetching updated cities:", error);
}
setShowCity(false);
};

const handleUpdated = async () => {
    try {
        const response = await fetch("http://localhost:5000/city/all");
        if (response.ok) {
            const data = await response.json();
            setCity(data);
        } else {
            console.error("Failed to fetch updated cities");
        }
    }
     catch (error) {
        console.error("Error fetching updated cities:", error);
    }
    setShowEdit(false);
};
  

return (
<div className="relative w-full min-h-screen bg-gray-50">
    <div className="w-full p-8 bg-white shadow-lg rounded-lg">
    <h1 className="text-2xl font-semibold text-gray-700 mb-6">City Management</h1>

    <div className="flex justify-between items-center mb-6">
        <input
        type="text"
        placeholder="Search Province"
        className="p-3 border rounded-lg w-2/3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
        <button
        className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
        onClick={() => setShowCity(true)}
        >
        + Create City
        </button>
    </div>

    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full border-collapse table-auto">
        <thead className="bg-white-200">
            <tr>
            <th className="border border-gray-200 p-3 text-left">SN</th>
            <th className="border border-gray-200 p-3 text-left">Province Name</th>
            <th className="border border-gray-200 p-3 text-left">City Name</th>
            <th className="border border-gray-200 p-3 text-left">Actions</th>
            </tr>
        </thead>
        <tbody>
            {cities.map((data, index) => (
            <tr key={data._id}>
                <td className="border border-gray-200 p-3">{index + 1}</td>
                <td className="border border-gray-200 p-3">
                {data.province ? data.province.name : 'No Province'}
                </td>
                <td className="border border-gray-200 p-3">{data.name}</td>
                <td className="border border-gray-200 p-3">
                <button
                    className="text-indigo-600 hover:text-indigo-800 mr-4"
                    onClick={()=>handleEdit(data)}
                >
                    <FaEdit size={18} />
                </button>
                <button
                    onClick={() => confirmDelete(data)}
                    className="text-red-600 hover:text-red-800"
                >
                    <RiDeleteBin6Line size={18} />
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    </div>

    {showCity && (
    <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
        <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
        <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={() => setShowCity(false)}
        >
            <IoMdCloseCircleOutline className="text-2xl" />
        </button>
        <CityForm
            onClose={() => setShowCity(false)}
            onCreated={handleCreated} 
        />
        </div>
    </div>
    )}

    {showDeleteConfirmation && (
    <div className="absolute inset-0 flex justify-center items-center bg-white-500 bg-opacity-50">
        <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[400px] border border-gray-200">
        <h2 className="text-lg text-center font-semibold text-gray-800 mb-4">
            Are you sure you want to delete?
        </h2>
        <div className="flex justify-around">
            <button
            onClick={handleDelete}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            >
            Yes, Delete
            </button>
            <button
            onClick={() => setShowDeleteConfirmation(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
            Cancel
            </button>
        </div>
        </div>
    </div>
    )}

{showEdit && (
<div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
<div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
    <button
    className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
    onClick={() => setShowEdit(false)}
    >
    <IoMdCloseCircleOutline className="text-2xl" />
    </button>
    <EditCity
    city={editCityData} 
    onClose={() => setShowEdit(false)}
    onUpdated={handleUpdated}
    />
</div>
</div>
)} 

</div>
)
}

export default CityTable
