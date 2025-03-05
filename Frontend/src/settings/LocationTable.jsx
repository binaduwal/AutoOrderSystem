import React, { useState, useEffect } from "react";
import CreateAddress from "./CreateAddress";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const LocationTable = () => {
  const [locations, setLocations] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);

  // Confirm delete
  const confirmDelete = (location) => {
    setLocationToDelete(location);
    setShowDeleteConfirmation(true);
  };

  // Handle delete
  const handleDelete = async () => {
    if (locationToDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/location/delete/${locationToDelete._id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setLocations((prev) =>
            prev.filter((loc) => loc._id !== locationToDelete._id)
          );
        }
      } catch (error) {
        console.error("Error deleting location:", error);
      }
      setShowDeleteConfirmation(false);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:5000/location/all");
        if (response.ok) {
          const data = await response.json();
          setLocations(data);
        } else {
          console.log("Failed to fetch locations");
        }
      } catch (error) {
        console.error("Error fetching locations", error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationCreated = (newLocation) => {
    setLocations((prev) => [...prev, newLocation]);
    setShowCreateForm(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Locations</h2>
      <button
        className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300 mb-6"
        onClick={() => setShowCreateForm(true)}
      >
        + Create
      </button>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Province
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              City
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Address
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {locations.map((addr) => (
            <tr key={addr._id}>
              <td className="px-4 py-3 text-sm text-gray-900">{addr.province}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{addr.city}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{addr.address}</td>
              <td className="px-4 py-3 text-sm text-gray-900 flex space-x-2">
                <button
                  className="text-black-600 hover:text-indigo-700 font-bold py-1 px-3 rounded text-xl"
                >
                  <FaEdit />
                </button>
                <button
                  className="text-black-600 hover:text-red-700 font-bold py-1 px-3 rounded text-xl"
                  onClick={() => confirmDelete(addr)}
                >
                  <RiDeleteBin6Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCreateForm && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
            <button
              className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowCreateForm(false)}
            >
              X
            </button>
            <CreateAddress onCreated={handleLocationCreated} />
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default LocationTable;
