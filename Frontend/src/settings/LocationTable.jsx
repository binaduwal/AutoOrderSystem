import React, { useState, useEffect } from "react";
import CreateAddress from "./CreateAddress";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditEntityModal from "../components/EditEntityModal";
import EditAddress from "./EditAddress";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const LocationTable = () => {
  const [locations, setLocations] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 5;

  const confirmDelete = (location) => {
    setLocationToDelete(location);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    if (locationToDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/location/delete/${locationToDelete._id}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          setLocations((prev) =>
            prev.filter((loc) => loc._id !== locationToDelete._id)
          );
          const newTotal = locations.length - 1;
          const newTotalPages = Math.ceil(newTotal / itemsPerPage);
          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages);
          }
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
          console.log("Fetched locations:", data);
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

  const handleEdit = (newData) => {
    setEditData(newData);
    setShowEdit(true);
  };

  const handleUpdated = async () => {
    try {
      const response = await fetch("http://localhost:5000/location/all");
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      }
    } catch (error) {
      console.error("Error fetching updated locations:", error);
    }
    setShowEdit(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const normalizeString = (str = "") =>
    str.toLowerCase().replace(/[-\s]/g, "");
  const filtered = locations.filter((sp) =>
    normalizeString(sp.address || "").includes(normalizeString(searchTerm))
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white min-h-screen w-full relative">
      <div className="w-full p-2 bg-white rounded-lg">
        <h2 className="text-xl font-semibold text-left text-black-600 mb-6">
          Manage Locations
        </h2>
        <div className="flex justify-between items-center mb-2">
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
          <button
            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition duration-300 mb-6"
            onClick={() => setShowCreateForm(true)}
          >
            + Create
          </button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                SN
              </th>
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
            {currentData.map((addr, index) => (
              <tr key={addr._id}>
                {/* Serial Number calculated using current page offset */}
                <td className="px-4 py-3 text-sm text-gray-900">
                  {index + indexOfFirst + 1}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {addr?.province?.name || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {addr?.city?.name || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {addr?.address || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 flex space-x-2">
                  <button
                    className="text-black-600 hover:text-indigo-700 font-bold py-1 px-3 rounded text-xl"
                    onClick={() => handleEdit(addr)}
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <EditEntityModal
          isOpen={showEdit}
          onClose={() => setShowEdit(false)}
          entityData={editData}
          onUpdated={handleUpdated}
          Component={EditAddress}
        />
      </div>
    </div>
  );
};

export default LocationTable;
