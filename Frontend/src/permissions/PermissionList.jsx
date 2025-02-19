import React, { useState } from 'react';
import CreatePermission from './CreatePermission';

const PermissionList = () => {
  const [showCreatePermission, setShowCreatePermission] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6 bg-gradient-to-r from-indigo-50 to-white">
      {/* Permission List Container */}
      <div className="w-[900px] p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-indigo-600 mb-6">Permission Management</h1>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search Category"
            className="p-3 border rounded-lg w-2/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            onClick={() => setShowCreatePermission(true)}
          >
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
              <tr className="text-center border border-gray-300">
                <td className="border border-gray-300 p-3">2</td>
                <td className="border border-gray-300 p-3">Binu</td>
                <td className="border border-gray-300 p-3">Binu</td>
                <td className="border border-gray-300 p-3">om</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Show Create Permission Form as a Pop-up */}
      {showCreatePermission && (
        <div className="fixed inset-0 bg-white flex justify-center items-center">
        <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[700px] border border-gray-200">            <button
              className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowCreatePermission(false)}
            >
              ✖
            </button>
            <CreatePermission />
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionList;
