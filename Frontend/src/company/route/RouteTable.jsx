import React, { useState, useEffect } from 'react';
import TableComponent from '../../components/TableComponent';
import Pagination from '../../components/Pagination';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import SearchBar from '../../components/SearchBar';
import EditRouteModal from '../../components/EditRouteModal';
import ActionButtons from '../../components/ActionButtons';
import CreateEntityModal from '../../components/CreateEntityModal';
import CreateRoute from './CreateRoute';

const RouteTable = () => {
  const [routes, setRoutes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await fetch('http://localhost:5000/route/all');
      if (response.ok) {
        const data = await response.json();
        setRoutes(Array.isArray(data) ? data.filter(route => route && route._id) : []);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  const handleCreated = (newRoute) => {
    setRoutes(prev => [...prev, newRoute]);
    setShowCreateForm(false);
  };

  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Name', key: 'routename' },
    { label: 'Status', key: 'status' },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const normalizeString = (str = "") => str.toLowerCase().replace(/[-\s]/g, '');
  const filtered = routes.filter((route) =>
    normalizeString(route.routename || '').includes(normalizeString(searchTerm))
  );
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const confirmDelete = (route) => {
    setDeleteData(route);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    if (deleteData) {
      try {
        const response = await fetch(`http://localhost:5000/route/delete/${deleteData._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setRoutes(routes.filter((route) => route._id !== deleteData._id));
        }
      } catch (error) {
        console.error('Error deleting route:', error);
      }
      setShowDeleteConfirmation(false);
    }
  };

  const handleEdit = (route) => {
    setEditData(route);
    setShowEdit(true);
  };

  const handleUpdated = async () => {
    await fetchDetails();
    setShowEdit(false);
  };

  return (
<div className='bg-white min-h-screen w-full relative'>
<div className='w-full p-2 bg-white rounded-lg'>

<h2 className="text-xl font-semibold text-left text-black-600 mb-4 mt-10">Manage Route</h2>
      <div className="flex justify-between items-center mb-2">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <button
          className="bg-indigo-600 text-white p-2 rounded-2xl hover:bg-indigo-700 transition duration-300 mb-6"
          onClick={() => setShowCreateForm(true)}
        >
          + Add Route
        </button>
      </div>

      <TableComponent
        columns={columns}
        data={currentData.map((route, index) => ({
          ...route,
          serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
        }))}
        actions={(route) => (
          <ActionButtons 
            item={route} 
            onEdit={handleEdit} 
            onDelete={confirmDelete} 
          />
        )}
      />

      <CreateEntityModal
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onCreated={handleCreated}
        Component={CreateRoute}
      />

      <EditRouteModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        routeData={editData}
        onUpdated={handleUpdated}
      />

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
    </div>
  </div>
  );
};

export default RouteTable;
