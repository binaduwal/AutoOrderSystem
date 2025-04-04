import React, { useEffect, useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import CreateRole from './CreateRole';
import EditRole from './EditRoles';
import SearchBar from '../components/SearchBar'
import TableComponent from '../components/TableComponent'
import ActionButtons from '../components/ActionButtons'
import Pagination from '../components/Pagination'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'
import BASE_URL from '../config'


const RolesList = () => {
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [roles, setRoles] = useState([]);
  const [showEditRole, setShowEditRole] = useState(false);
  const [DeleteRoleData, setDeleteRoleData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [editRoleData, setEditRoleData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const userRole = sessionStorage.getItem("role"); 

  useEffect(() => {
    fetchRole();
  }, [roles.length]);

  const fetchRole = async () => {
    try {
      const response = await fetch(`${BASE_URL}/role/all`);
      if (response.ok) {
        const data = await response.json();
        setRoles(data);
      } else {
        console.error("Failed to fetch Roles");
      }
    } catch (error) {
      console.error("Error fetching Roles:", error);
    }
  };

  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Name', key: 'name' },
    { label: 'Display Name', key: 'display_name' },
    { label: 'Description', key: 'description' },
  ]


  const handleEdit = (role) => {
    setEditRoleData(role);
    setShowEditRole(true);
  };

  const handleRoleUpdated = async () => {
    await fetchRole();
    setShowEditRole(false);
  };

  const handleRoleCreated = (newRole) => {
    setRoles(prevRoles => [...prevRoles, newRole]);
    setShowCreateRole(false);
  };

  const confirmDelete = (role) => {
    setDeleteRoleData(role);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    if (DeleteRoleData) {
      try {
        const response = await fetch(`${BASE_URL}/role/delete/${DeleteRoleData._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setRoles(roles.filter((p) => p._id !== DeleteRoleData._id));
          if ((currentPage - 1) * itemsPerPage >= roles.length - 1) {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
          }
          console.log('Role deleted successfully');
        } else {
          console.error('Failed to delete Role');
        }
      } catch (error) {
        console.error('Error deleting Role:', error);
      }
      setShowDeleteConfirmation(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const normalizeString = (str) => {
    return str ? str.toLowerCase().replace(/[-\s]/g, '') : '';
  }

  const filteredRoles = roles.filter((role) =>
    normalizeString(role.name).includes(normalizeString(searchTerm))
  );

  const indexOfLastRoles = currentPage * itemsPerPage;
  const indexOfFirstRoles = indexOfLastRoles - itemsPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRoles, indexOfLastRoles);
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  if (userRole !== "admin") {
    columns.push({ label: "Actions", key: "actions" });
  }

  return (
<div className='bg-white min-h-screen w-full relative'>
<div className='w-full p-2 bg-white rounded-lg'>

        <h2 className="text-xl font-semibold text-left text-black-600 mb-4">
          Role Management
        </h2>

        <div className="flex justify-between items-center mb-2">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

        {userRole !== "admin" && (
          <button
            className="bg-indigo-600 text-white p-2 rounded-2xl hover:bg-indigo-700 transition duration-300 mb-6"
            onClick={() => setShowCreateRole(true)}
          >
            + Create Role
          </button>
        )}
        </div>

        <div className="overflow-x-auto">
        </div>

            <TableComponent columns={columns} 
            data={currentRoles.map((role, index) => ({
              ...role,
              serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
              actions:
              userRole !== "admin" ? (
                <ActionButtons item={role} onEdit={handleEdit} onDelete={confirmDelete} />
              ) : null
            
            }))} 
                 />
        
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

        {showCreateRole && (
          <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[700px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowCreateRole(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <CreateRole onRoleCreated={handleRoleCreated} />
            </div>
          </div>
        )}

<DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
      />


        {showEditRole && (
          <div className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} >

           <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[700px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowEditRole(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <EditRole roleData={editRoleData} onRoleUpdated={handleRoleUpdated} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolesList;
