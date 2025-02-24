import React, { useEffect, useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import CreateRole from './CreateRole';

const RolesList = () => {
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [roles, setRoles] = useState([]);
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

  // Re-fetch roles immediately after a new role is created
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
                      <button className="text-black-600 hover:text-indigo-800 mr-4"></button>
                      <button className="text-black-00 hover:text-red-800"></button>
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
      </div>
    </div>
  );
};

export default RolesList;
