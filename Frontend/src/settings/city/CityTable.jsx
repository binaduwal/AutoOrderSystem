import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CityForm from './CityForm';
import EditCity from './EditCity';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'
import BASE_URL from '../../config'

const CityTable = () => {
  const [cities, setCity] = useState([]);
  const [showCity, setShowCity] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editCityData, setEditCityData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleEdit = (cityData) => {
    setEditCityData(cityData);
    setShowEdit(true);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/city/all`);
        if (response.ok) {
          const data = await response.json();
          setCity(data);
        } else {
          console.error("Failed to fetch details");
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, []);

  const handleDelete = async () => {
    if (permissionToDelete) {
      try {
        const response = await fetch(`${BASE_URL}/city/delete/${permissionToDelete._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setCity((prevCities) => prevCities.filter((p) => p._id !== permissionToDelete._id));
          console.log('City deleted successfully');
        } else {
          console.error('Failed to delete');
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
      setShowDeleteConfirmation(false);
    }
  };

  const confirmDelete = (cityData) => {
    setPermissionToDelete(cityData);
    setShowDeleteConfirmation(true);
  };

  const handleCreated = async () => {
    try {
      const response = await fetch(`${BASE_URL}/city/all`);
      if (response.ok) {
        const data = await response.json();
        setCity(data);
      } else {
        console.error("Failed to fetch updated cities");
      }
    } catch (error) {
      console.error("Error fetching updated cities:", error);
    }
    setShowCity(false);
  };

  const handleUpdated = async () => {
    try {
      const response = await fetch(`${BASE_URL}/city/all`);
      if (response.ok) {
        const data = await response.json();
        setCity(data);
      } else {
        console.error("Failed to fetch updated cities");
      }
    } catch (error) {
      console.error("Error fetching updated cities:", error);
    }
    setShowEdit(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const normalizeString = (str = "") => str.toLowerCase().replace(/[-\s]/g, '');
  const filteredCities = cities.filter((city) =>
    normalizeString(city.province?.name|| '').includes(normalizeString(searchTerm))
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredCities.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
<div className='bg-white min-h-screen w-full relative'>
<div className='w-full p-2 bg-white rounded-lg'>
        <h1 className="text-xl font-semibold text-left text-black-600 mb-4 mt-10">City Management</h1>

        <div className="flex justify-between items-center mb-6">
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
          <button
            className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            onClick={() => setShowCity(true)}
          >
            + Create City
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg">
          <table className="w-full border-collapse table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SN</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Province Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">City Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((data, index) => (
                <tr key={data._id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{index + indexOfFirst + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {data.province ? data.province.name : 'No Province'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{data.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <button
                  className="text-black-600 hover:text-indigo-700 font-bold py-1 px-3 rounded text-xl"
                  onClick={() => handleEdit(data)}
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => confirmDelete(data)}
                      className="text-black-600 hover:text-red-700 font-bold py-1 px-3 rounded text-xl"
                    >
                      <RiDeleteBin6Line size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

      </div>

      {showCity && (
        <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setShowCity(false)}
            >
              <IoMdCloseCircleOutline className="text-2xl" />
            </button>
            <CityForm
              onClose={() => setShowCity(false)}
              onCreated={handleCreated} 
            />
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
      />


      {showEdit && (
        <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
            <button
              className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowEdit(false)}
            >
              <IoMdCloseCircleOutline className="text-2xl" />
            </button>
            <EditCity
              city={editCityData} 
              onClose={() => setShowEdit(false)}
              onUpdated={handleUpdated}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CityTable;
