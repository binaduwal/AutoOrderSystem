import React from 'react';

const CreatePermission = () => {
  
  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-indigo-50 to-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-semibold  text-indigo-600 mb-6 text-left">Create New Permission</h1>
      <form className="space-y-6">
        <div className="space-y-2">
          <label className="block font-medium text-left text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Unique name for permission. For example: 'create-post', 'edit-user'."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium text-left text-gray-700">Display Name</label>
          <input
            type="text"
            name="display_name"
            required
            placeholder="Readable name for permission. For example: 'Create Posts', 'Edit Users'."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium text-left text-gray-700">Description</label>
          <textarea
            name="description"
            placeholder="Description for the permission"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Create Permission
        </button>
      </form>
    </div>
  );
}

export default CreatePermission;
