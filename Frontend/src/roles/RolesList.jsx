import React, { useEffect, useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import CreateRole from './CreateRole';
import { RiDeleteBin6Line } from "react-icons/ri"
import { FaEdit } from "react-icons/fa"


const RolesList = () => {
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [roles, setRoles] = useState([]);

  const [DeleteRoleData, setDeleteRoleData] = useState(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)



  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchRole();
  }, []);

  const fetchRole = async () => {
    try {
      const response = await fetch("http://localhost:5000/role/all");
      if (response.ok) {
        const data = await response.json();
        setRoles(data);
      } else {
        console.error("Failed to fetch Roles");
      }
    } catch (error) {
      console.error("Error fetching Roles:", error);
    }
  };

  // const handleEdit = (role) => {
  //   setEditPermissionData(role)
  //   setShowEditPermission(true)
  // }

  const confirmDelete = (role) => {
    setDeleteRoleData(role)
    setShowDeleteConfirmation(true)
  }


  const handleDelete = async () => {
    if (DeleteRoleData) {
      try {
        const response = await fetch(`http://localhost:5000/role/delete/${DeleteRoleData._id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          // Remove the deleted Roles from the state
          setRoles(roles.filter((p) => p._id !== DeleteRoleData._id))
          // Adjust current page if deleting leaves the current page empty
          if ((currentPage - 1) * itemsPerPage >= roles.length - 1) {
            setCurrentPage((prev) => Math.max(prev - 1, 1))
          }
          console.log('Role deleted successfully')
        } else {
          console.error('Failed to delete Role')
        }
      } catch (error) {
        console.error('Error deleting Role:', error)
      }
      setShowDeleteConfirmation(false)

    }
  }



  const handleRoleCreated = async (newRole) => {
    await fetchRole();
    setShowCreateRole(false);
  };

  const indexOfLastRoles = currentPage * itemsPerPage;
  const indexOfFirstRoles = indexOfLastRoles - itemsPerPage;
  const currentRoles = roles.slice(indexOfFirstRoles, indexOfLastRoles);
  const totalPages = Math.ceil(roles.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative w-full min-h-screen bg-white">
      <div className="w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
          Role Management
        </h1>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search Category"
            className="p-3 border rounded-lg w-2/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            onClick={() => setShowCreateRole(true)}
          >
            + CREATE ROLE
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
                <th className="border border-gray-300 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRoles.length > 0 ? (
                currentRoles.map((role, index) => (
                  <tr key={role._id} className="text-center border border-gray-300">
                    <td className="border border-gray-300 p-3">{index + 1 + indexOfFirstRoles}</td>
                    <td className="border border-gray-300 p-3">{role.name}</td>
                    <td className="border border-gray-300 p-3">{role.display_name}</td>
                    <td className="border border-gray-300 p-3">{role.description}</td>
                    <td className="border border-gray-300 p-3">
                      <button className="text-black-600 hover:text-indigo-800 mr-4">
                                                  <FaEdit />
                        
                      </button>
                      <button 
                        onClick={() => confirmDelete(role)}

                      className="text-black-00 hover:text-red-800">
                                                  <RiDeleteBin6Line />
                        
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No Roles available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-3 py-1 mx-1 rounded ${currentPage === idx + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {showCreateRole && (
          <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[700px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowCreateRole(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <CreateRole onRoleCreated={handleRoleCreated} />
            </div>
          </div>
        )}

{showDeleteConfirmation && (
        <div className="absolute inset-0 flex justify-center items-center bg-white-500 bg-opacity-50">
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[400px] border border-gray-200">
            <h2 className="text-lg text-center font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this Role?
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

      </div>
    </div>
  );
};

export default RolesList;
