import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import EditUser from './EditUser';
import PasswordForm from '../components/PasswordForm';
import Pagination from '../components/Pagination';
import TableComponent from '../components/TableComponent'
import SearchBar from '../components/SearchBar'


const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditUser, setShowEditUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [userForPasswordChange, setUserForPasswordChange] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')
    const itemsPerPage = 4;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await fetch('http://localhost:5000/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setUsers(data?.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'UserName', key: 'username' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' },
    { label: 'Status', key: 'status' },
  ]

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const normalizeString = (str = "") => str.toLowerCase().replace(/[-\s]/g, '')
  const filtered = users.filter((sp) =>
    normalizeString(sp.username || '').includes(normalizeString(searchTerm))
  )

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        const response = await fetch(`http://localhost:5000/admin/delete/${userToDelete._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setUsers(users.filter((user) => user._id !== userToDelete._id));
          if ((currentPage - 1) * itemsPerPage >= users.length - 1) {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
          }
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
      setShowDeleteConfirmation(false);
    }
  };

  const handleEdit = (user) => {
    setShowEditUser(user._id);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
    setShowEditUser(true);
  };

  const handleChangePassword = (user) => {
    setUserForPasswordChange(user);
    setShowChangePasswordForm(true);
  };

  const closePasswordForm = () => {
    setShowChangePasswordForm(false);
    setUserForPasswordChange(null);
  };

    const actions = (company) => (
      <>
        <button
          className="text-black-600 hover:text-indigo-700 font-bold py-1 px-3 rounded mr-2 text-xl"
          onClick={() => handleEdit(company)}
          
        >
          <FaEdit />
        </button>
        <button
          className="text-black-600 hover:text-red-700 font-bold py-1 px-3 rounded mr-2 text-xl"
          onClick={() => confirmDelete(company)}
        >
          <RiDeleteBin6Line />
        </button>
        <button
          onClick={() => handleChangePassword(company)}
          className="text-black-400 border hover:text-indigo-700 py-0 px-1 rounded"
        >
          Change Password
        </button>
      </>
    )
  

  return (
<div className='bg-white min-h-screen w-full relative'>
<div className='w-full p-2 bg-white rounded-lg'>
      <h2 className="text-xl font-semibold text-left text-black-600 mb-4 mt-5">Manage Users</h2>
      <div className="flex justify-between items-center mb-2">

      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      
      <button
        className="bg-indigo-600 text-white p-2 rounded-2xl hover:bg-indigo-700 transition duration-300 mb-6"
        onClick={() => navigate('/admin/user')}
      >
        + Create User
      </button>
</div>

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

    <TableComponent columns={columns} 
    data={currentUsers.map((user, index) => ({
      ...user,
      serialNumber: (currentPage - 1) * itemsPerPage + index + 1
    }))} 
    actions={actions}
     />

<Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />


      {showEditUser && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 overflow-y-auto"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
          <div className="relative bg-white p-6 rounded-xl shadow-2xl w-[600px] border border-gray-200">
            <button
              className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowEditUser(null)}
            >
              <IoMdCloseCircleOutline size={30} />
            </button>
            <EditUser
              userId={showEditUser}
              onUserUpdated={handleUserUpdated}
              onClose={() => setShowEditUser(null)}
            />
          </div>
        </div>
      )}

      {showChangePasswordForm && (
        <PasswordForm
        adminId={userForPasswordChange._id}
        endpoint="http://localhost:5000/admin/update-password"
        onClose={closePasswordForm}
        />
      )}
    </div>
    </div>
  );
};

export default ManageUser;
