import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const CreateUser = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState(true) 
  const [role, setRole] = useState('salesperson') 
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    const userData = {
      username,
      email,
      password,
      confirmPassword,
      status: status ? 'active' : 'inactive',
      role
    };
  
    try {
      const response = await fetch('http://localhost:5000/admin/create', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), 
      });
  
      if (response.ok) {
        alert('User created successfully!');
        navigate('/admin/manage')
        console.log(await response.json()); 
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Error creating user!'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Error creating user!');
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            User Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="User Name"
            className="w-full px-3 py-2 border border-gray-300  rounded focus:outline-none focus:ring focus:border-black-100"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300  rounded focus:outline-none focus:ring focus:border-indigo-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300  rounded focus:outline-none focus:ring focus:border-indigo-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirm_password" className="block text-gray-700 font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border border-gray-300  rounded focus:outline-none focus:ring focus:border-indigo-300"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="active_user"
            name="active_user"
            checked={status}
            onChange={() => setStatus(!status)}
            className="mr-2"
          />
          <label htmlFor="active_user" className="text-gray-700 font-medium">
            Active User
          </label>
        </div>

        <p className="mb-2 font-medium">Assign User Role</p>
        <div className="mb-4 flex items-center">
          <input
            type="radio"
            id="super_admin"
            name="role"
            value="superadmin"
            checked={role === 'superadmin'}
            onChange={(e) => setRole(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="super_admin" className="text-black-700">
            Super Administrator
          </label>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="radio"
            id="sales_person"
            name="role"
            value="salesperson"
            checked={role === 'salesperson'}
            onChange={(e) => setRole(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="sales_person" className="text-black-700">
            Sales Person
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
        >
          Create User
        </button>
      </form>
    </div>
  )
}

export default CreateUser
