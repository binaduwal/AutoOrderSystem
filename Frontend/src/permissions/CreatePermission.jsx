import React, { useState } from 'react';

const CreatePermission = ({ onClose }) => {
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleDisplayNameChange = (e) => {
    const updatedDisplayName = e.target.value;
    setDisplayName(updatedDisplayName);
    setName(updatedDisplayName.replace(/\s+/g, '-'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-[600px] mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold text-left text-indigo-600 mb-4">Create New Permission</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium text-left">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-left">Display Name</label>
          <input
            type="text"
            name="display_name"
            value={displayName}
            onChange={handleDisplayNameChange}
            required
            placeholder="Readable name for permission"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-left">Description</label>
          <textarea
            name="description"
            placeholder="Enter description"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Create Permission
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePermission;
