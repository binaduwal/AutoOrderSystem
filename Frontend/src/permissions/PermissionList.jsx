import React, { useEffect, useState } from 'react';
import CreatePermission from './CreatePermission';
import EditPermission from './EditPermission';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const PermissionList = () => {
  const [showCreatePermission, setShowCreatePermission] = useState(false);
  const [showEditPermission, setShowEditPermission] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [editPermissionData, setEditPermissionData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

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

  const handlePermissionCreated = (newPermission) => {
    setPermissions((prevPermissions) => [...prevPermissions, newPermission]);
    setShowCreatePermission(false);
  };

  const handleEdit = (perm) => {
    setEditPermissionData(perm);
    setShowEditPermission(true);
  };

  const handleDelete = async () => {
    if (permissionToDelete) {
      try {
        const response = await fetch(`http://localhost:5000/permission/delete/${permissionToDelete._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Remove the deleted permission from the state
          setPermissions(permissions.filter((p) => p._id !== permissionToDelete._id));
          // Adjust current page if deleting leaves the current page empty
          if ((currentPage - 1) * itemsPerPage >= permissions.length - 1) {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
          }
          console.log('Permission deleted successfully');
        } else {
          console.error('Failed to delete permission');
        }
      } catch (error) {
        console.error('Error deleting permission:', error);
      }
      setShowDeleteConfirmation(false);
    }
  };

  const confirmDelete = (perm) => {
    setPermissionToDelete(perm);
    setShowDeleteConfirmation(true);
  };

  const handlePermissionUpdated = (updatedPermission) => {
    setPermissions(permissions.map((perm) => (perm._id === updatedPermission._id ? updatedPermission : perm)));
    setShowEditPermission(false);
  };

  // Calculate indexes for the current page items
  const indexOfLastPermission = currentPage * itemsPerPage;
  const indexOfFirstPermission = indexOfLastPermission - itemsPerPage;
  const currentPermissions = permissions.slice(indexOfFirstPermission, indexOfLastPermission);
  const totalPages = Math.ceil(permissions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative w-full min-h-screen bg-white">
      {!showCreatePermission && !showEditPermission && (
        <div className="w-[900px] p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
            Permission Management
          </h1>

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
                  <th className="border border-gray-300 p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPermissions.length > 0 ? (
                  currentPermissions.map((perm, index) => (
                    <tr key={perm._id} className="text-center border border-gray-300">
                      <td className="border border-gray-300 p-3">{index + 1 + indexOfFirstPermission}</td>
                      <td className="border border-gray-300 p-3">{perm.name}</td>
                      <td className="border border-gray-300 p-3">{perm.display_name}</td>
                      <td className="border border-gray-300 p-3">{perm.description}</td>
                      <td className="border border-gray-300 p-3">
                        <button
                          onClick={() => handleEdit(perm)}
                          className="text-black-600 hover:text-indigo-800 mr-4"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => confirmDelete(perm)}
                          className="text-black-00 hover:text-red-800"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      No permission available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
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
        </div>
      )}

      {showCreatePermission && (
        <div className="absolute inset-0 flex justify-center items-center bg-white-500 bg-opacity-50">
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[600px] border border-gray-200">
            <button
              className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowCreatePermission(false)}
            >
              close
            </button>
            <CreatePermission
              onClose={() => setShowCreatePermission(false)}
              onPermissionCreated={handlePermissionCreated}
            />
          </div>
        </div>
      )}

      {showEditPermission && (
        <div className="absolute inset-0 flex justify-center items-center bg-white-500 bg-opacity-50">
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[600px] border border-gray-200">
            <button
              className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowEditPermission(false)}
            >
              close
            </button>
            <EditPermission
              permission={editPermissionData}
              onClose={() => setShowEditPermission(false)}
              onPermissionUpdated={handlePermissionUpdated}
            />
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="absolute inset-0 flex justify-center items-center bg-white-500 bg-opacity-50">
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[400px] border border-gray-200">
            <h2 className="text-lg text-center font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this permission?
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
  );
};

export default PermissionList;
