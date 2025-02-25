import React from 'react'

const EditUser = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New User</h2>
      <form >
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            User Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
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
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300  rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contactNo" className="block text-gray-700 font-medium mb-2">
            contact Number
          </label>
          <input
            type="text"
            id="contactNo"
            name="contactNo"
            placeholder="9841456238"
            className="w-full px-3 py-2 border border-gray-300  rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="address"
            className="w-full px-3 py-2 border border-gray-300  rounded focus:outline-none focus:ring focus:border-blue-300"
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
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300  rounded focus:outline-none focus:ring focus:border-blue-300"
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
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border border-gray-300  rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="active_user"
            name="active_user"
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

export default EditUser