import React, { useState, useEffect } from 'react';

const EditUser = ({ userId, onClose, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contactNo: '',
    address: '',
    status: true,
    role: 'salesperson'
  });

  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/edit/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            username: data.username || '',
            email: data.email || '',
            contactNo: data.contactNo || '', 
            address: data.address || '',     
            status: data.status === 'active',
            role: data.role || 'salesperson'
          });
        } else {
          alert('Failed to fetch user details.');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: formData.username,
      email: formData.email,
      contactNo: formData.contactNo,
      address: formData.address,
      status: formData.status ? 'active' : 'inactive',
      role: formData.role,
    };

    try {
      const response = await fetch(`http://localhost:5000/admin/edit/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const result = await response.json();
        const updatedUser = result.admin; 
         alert('User updated successfully!');
        if (onUserUpdated) {
          onUserUpdated(updatedUser);
        }
        if (onClose) {
          onClose();
        }
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Update failed'}`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user!');
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4 text-black">Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-1">User Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="User Name"
            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contactNo" className="block text-gray-700 font-medium mb-1">Contact Number</label>
          <input
            type="text"
            id="contactNo"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            placeholder="Contact Number"
            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="block text-gray-700 font-medium mb-1">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-3 flex items-center">
          <input
            type="checkbox"
            id="active_user"
            name="status"
            checked={formData.status}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="active_user" className="text-gray-700 font-medium">Active User</label>
        </div>

        <p className="mb-3 font-medium">Assign User Role</p>
        <div className="flex items-center">
          <input
            type="radio"
            id="super_admin"
            name="role"
            value="superadmin"
            checked={formData.role === 'superadmin'}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="super_admin" className="text-gray-700">Super Administrator</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="sales_person"
            name="role"
            value="salesperson"
            checked={formData.role === 'salesperson'}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="sales_person" className="text-gray-700">Sales Person</label>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
