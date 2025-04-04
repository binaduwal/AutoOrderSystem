import React, { useEffect, useState } from 'react';
import ProvinceForm from './ProvinceForm';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdCloseCircleOutline } from "react-icons/io";
import EditProvince from './EditProvince';
import SearchBar from '../../components/SearchBar'
import Pagination from '../../components/Pagination'
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'
import BASE_URL from '../../config'


const ProvinceTable = () => {
  const [province, setProvince] = useState([]);
  const [showProvince, setShowProvince] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState(null);
  const [showEdit, setShowEdit] = useState(false)
  const [editProvinceData, setEditProvinceData] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 5


  const handleEdit = (province) => {
    setEditProvinceData(province)
    setShowEdit(true)
  }
    
    

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/province/all`);
        if (response.ok) {
          const data = await response.json();
          setProvince(data);
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
        const response = await fetch(`${BASE_URL}/province/delete/${permissionToDelete._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setProvince(province.filter((p) => p._id !== permissionToDelete._id));
          console.log('Province deleted successfully');
        } else {
          console.error('Failed to delete');
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
      setShowDeleteConfirmation(false);
    }
  };

  const confirmDelete = (province) => {
    setPermissionToDelete(province);
    setShowDeleteConfirmation(true);
  };

  const handleCreated = (newData) => {
    setProvince((prevData) => [...prevData, newData]); 
    setShowProvince(false);
  };
  const handleProvinceUpdated = (updatedProvince) => {
    setProvince(province.map((province) => (province._id === updatedProvince._id ? updatedProvince : province)))
    setShowEdit(false)
  }


  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const normalizeString = (str = "") => str.toLowerCase().replace(/[-\s]/g, '')
const filtered = province.filter((sp) =>
  normalizeString(sp.name || '').includes(normalizeString(searchTerm))
)


const indexOfLast = currentPage * itemsPerPage
const indexOfFirst = indexOfLast - itemsPerPage
const currentData = (filtered || []).slice(indexOfFirst, indexOfLast)
const totalPages = Math.ceil((province?.length || 0) / itemsPerPage)


const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber)
}

  

  return (
<div className='bg-white min-h-screen w-full relative'>
<div className='w-full p-2 bg-white rounded-lg'>
        <h2 className="text-xl font-semibold text-left text-black-600 mb-4 mt-10">Province Management</h2>
        <div className="flex justify-between items-center mb-2">

        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
          <button
            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            onClick={() => setShowProvince(true)}
          >
            + Create Province
          </button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SN</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((data, index) => (
                <tr key={data._id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{data.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <button
                  className="text-black-600 hover:text-indigo-700 font-bold py-1 px-3 rounded text-xl"
                  onClick={()=>handleEdit(data)}
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

      {showProvince && (
        <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setShowProvince(false)}
            >
              <IoMdCloseCircleOutline className="text-2xl" />
            </button>
            <ProvinceForm
              onClose={() => setShowProvince(false)}
              onCreated={handleCreated} 
            />
          </div>
        </div>
      )}

      <Pagination 
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      />

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
      <EditProvince
        province={editProvinceData} 
        onClose={() => setShowEdit(false)}
        onUpdated={handleProvinceUpdated}
      />
    </div>
  </div>
)}

    </div>
  );
};

export default ProvinceTable;
