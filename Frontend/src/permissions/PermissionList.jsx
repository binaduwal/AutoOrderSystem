import React, { useEffect, useState } from 'react';
import CreatePermission from './CreatePermission';

const PermissionList = () => {
  const [showCreatePermission, setShowCreatePermission] = useState(false)
  const [permissions, setPermissions]=useState([])

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const response = await fetch("http://localhost:5000/permission/all");
      if (response.ok) {
        const data = await response.json();
        setPermissions(data);
      } else {
        console.error("Failed to fetch permissions");
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

const handlePermissionCreated=(newPermission)=>
{
  setPermissions([...permissions,newPermission])
  setShowCreatePermission(false)
}

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
              {permissions.length > 0 ? (
                permissions.map((perm, index) => (
                  <tr key={perm.id} className="text-center border border-gray-300">
                    <td className="border border-gray-300 p-3">{index + 1}</td>
                    <td className="border border-gray-300 p-3">{perm.name}</td>
                    <td className="border border-gray-300 p-3">{perm.display_name}</td>
                    <td className="border border-gray-300 p-3">{perm.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No permission available.
                  </td>
                </tr>
              )}
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
            <CreatePermission onClose={() => setShowCreatePermission(false)} onPermissionCreated={handlePermissionCreated} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionList;
