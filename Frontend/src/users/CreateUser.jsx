import React from 'react'

const CreateUser = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New User</h2>
      <form action="#" method="post">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            User Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="User Name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
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
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
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
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
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
            placeholder="Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
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
            type="checkbox"
            id="super_admin"
            name="role"
            value="super_admin"
            className="mr-2"
          />
          <label htmlFor="super_admin" className="text-gray-700">
            Super Administrator
          </label>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="store_manager"
            name="role"
            value="store_manager"
            className="mr-2"
          />
          <label htmlFor="store_manager" className="text-gray-700">
            Store Manager
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


