import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [UserToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/admins');
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const data = await response.json();
      setUsers(data?.admins || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Pagination calculations
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Delete functionality
  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    if (UserToDelete) {
      try {
        const response = await fetch(`http://localhost:5000/admin/admins/${UserToDelete._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setUsers(users.filter(user => user._id !== UserToDelete._id));
          if ((currentPage - 1) * itemsPerPage >= users.length - 1) {
            setCurrentPage(prev => Math.max(prev - 1, 1));
          }
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
      setShowDeleteConfirmation(false);
    }
  };


  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <button
        className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300 mb-6"
        onClick={() => navigate('/user')}
      >
        + CREATE USER
      </button>

      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Headers */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SN</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {currentUsers.map((user, index) => (
            <tr key={user._id}>
              <td className="px-6 py-4">{index + 1 + indexOfFirst}</td>
              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => toggleStatus(user._id, user.status)}
                  className="flex items-center gap-2"
                >
                  <span className={`w-4 h-4 rounded-full ${user.status === 'active' ? 'bg-green-400' : 'bg-red-500'}`}></span>
                  {user.status}
                </button>
              </td>
              <td className="px-6 py-4 text-center">
                <button className="text-indigo-600 hover:text-indigo-700 font-bold py-1 px-3 rounded mr-2">
                  <FaEdit />
                </button>
                <button 
                  onClick={() => confirmDelete(user)} 
                  className="text-red-600 hover:text-red-700 font-bold py-1 px-3 rounded"
                >
                  <RiDeleteBin6Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

      {/* Delete Confirmation Modal */}
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

export default ManageUser;