import React from 'react';

const PermissionList = () => {
  return (
    <div className="w-full min-h-screen p-6 bg-gradient-to-r from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-indigo-600 mb-6">Permission Management</h1>

        <div className="flex justify-between mb-6">
          <input
            type="text"
            placeholder="Search Category"
            className="p-3 border rounded-lg w-4xl mr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition duration-300">
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
              </tr>
            </thead>
            <tbody>
              <tr className="text-center border border-gray-300">
                <td className="border border-gray-300 p-3">1</td>
                <td className="border border-gray-300 p-3">Bina</td>
                <td className="border border-gray-300 p-3">Bina</td>
                <td className="border border-gray-300 p-3">om</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PermissionList;
