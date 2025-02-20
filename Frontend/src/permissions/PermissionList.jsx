import React, { useEffect, useState } from 'react';
import CreatePermission from './CreatePermission';
import EditPermission from './EditPermission';
import { createPortal } from "react-dom"; //

const PermissionList = () => {
  const [showCreatePermission, setShowCreatePermission] = useState(false)
  const [permissions, setPermissions]=useState([])
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showEditPermission, setShowEditPermission] = useState(false);
  const [editPermissionData, setEditPermissionData] = useState(null);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const response = await fetch("http://localhost:5000/permission/all");
      if (response.ok) {
        const data = await response.json();
        setPermissions(data);
      } else {
        console.error("Failed to fetch permissions");
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

const handlePermissionCreated=(newPermission)=>
{
  setPermissions((prevPermissions) => [...prevPermissions, newPermission]);
  setShowCreatePermission(false)
  setOpenDropdown(null); 
}

const handleEdit = (perm) => {
  setEditPermissionData(perm); 
  setShowEditPermission(true); 
};
const handleDelete=async(perm)=>{
  try{
const response=await fetch(`http://localhost:5000/permission/delete/${perm._id}`,
  {method:'DELETE'}
)
if (response.ok) {
  setPermissions(permissions.filter((p) => p._id !== perm._id));
  console.log('Permission deleted successfully');
} else {
  console.error('Failed to delete permission');
}
  }
catch (error) {
console.error('Error deleting permission:', error);
}

setOpenDropdown(null);
};

const toggleDropdown = (id) => {
  setOpenDropdown(openDropdown === id ? null : id);
};

const handlePermissionUpdated = (updatedPermission) => {
  setPermissions(permissions.map((perm) => (perm._id === updatedPermission._id ? updatedPermission : perm)));
  setShowEditPermission(false);
  setOpenDropdown(null);
};



  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6 bg-gradient-to-r from-indigo-50 to-white">
      {/* Permission List Container */}
      <div className="w-[900px] p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-indigo-600 mb-6">Permission Management</h1>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search Category"
            className="p-3 border rounded-lg w-2/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            onClick={() => setShowCreatePermission(true)}
          >
            + CREATE PERMISSION
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-3">SN</th>
                <th className="border border-gray-300 p-3">Name</th>
                <th className="border border-gray-300 p-3">Display Name</th>
                <th className="border border-gray-300 p-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {permissions.length > 0 ? (
                permissions.map((perm, index) => (
                  <tr key={perm._id} className="text-center border border-gray-300">
                    <td className="border border-gray-300 p-3">{index + 1}</td>
                    <td className="border border-gray-300 p-3">{perm.name}</td>
                    <td className="border border-gray-300 p-3">{perm.display_name}</td>
                    <td className="border border-gray-300 p-3">{perm.description}</td>
                    <td className="border border-gray-300 p-3 relative">
    <button
      onClick={() => toggleDropdown(perm._id)}
      className="text-xl focus:outline-none"
    >
      ⋮
    </button>
    {openDropdown === perm._id && (
      <div  className="absolute right-0 w-20 bg-white border border-gray-200 shadow-lg rounded-md z-50"
      >
        <button
          onClick={() => {
            handleEdit(perm);
            setOpenDropdown(null);
          }}
          className="block w-full text-left px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
        >
          Edit
        </button>
        <button
          onClick={() => {
            handleDelete(perm);
            setOpenDropdown(null);
          }}
          className="block w-full text-left px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
        >
          Delete
        </button>
      </div>
    )}
  </td>   
                 </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No permission available.
                  </td>
                </tr>
              )}
            </tbody>            
          </table>
        </div>
      </div>

      {showCreatePermission && (
        <div className="fixed inset-0 bg-white flex justify-center items-center">
        <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[600px] border border-gray-200">            <button
              className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowCreatePermission(false)}
            >
              close
            </button>
            <CreatePermission onClose={() => setShowCreatePermission(false)} onPermissionCreated={handlePermissionCreated} />
          </div>
        </div>
      )}

{showEditPermission && (
        <div className="fixed inset-0 bg-white flex justify-center items-center">
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[600px] border border-gray-200">
            <button
              className="absolute top-7 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setShowEditPermission(false)}
            >
           close
            </button>
            <EditPermission permission={editPermissionData} onClose={() => setShowEditPermission(false)} onPermissionUpdated={handlePermissionUpdated} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionList;
