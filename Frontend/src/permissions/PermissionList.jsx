import React, { useEffect, useState } from 'react'
import CreatePermission from './CreatePermission'
import EditPermission from './EditPermission'
import { IoMdCloseCircleOutline } from "react-icons/io"
import SearchBar from '../components/SearchBar'
import TableComponent from '../components/TableComponent'
import ActionButtons from '../components/ActionButtons'
import Pagination from '../components/Pagination'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'



const PermissionList = () => {
  const [showCreatePermission, setShowCreatePermission] = useState(false)
  const [showEditPermission, setShowEditPermission] = useState(false)
  const [permissions, setPermissions] = useState([])
  const [editPermissionData, setEditPermissionData] = useState(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [permissionToDelete, setPermissionToDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 

  useEffect(() => {
    fetchPermissions()
  }, [])

  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Name', key: 'name' },
    { label: 'Display Name', key: 'display_name' },
    { label: 'Description', key: 'description' },
  ]


  const fetchPermissions = async () => {
    try {
      const response = await fetch("http://localhost:5000/permission/all")
      if (response.ok) {
        const data = await response.json()
        setPermissions(data)
      } else {
        console.error("Failed to fetch permissions")
      }
    } 
    catch (error) {
      console.error("Error fetching permissions:", error)
    }
  }

  const handlePermissionCreated = (newPermission) => {
    setPermissions((prevPermissions) => [...prevPermissions, newPermission])
    setShowCreatePermission(false)
  }

  const handleEdit = (perm) => {
    setEditPermissionData(perm)
    setShowEditPermission(true)
  }

  const handleDelete = async () => {
    if (permissionToDelete) {
      try {
        const response = await fetch(`http://localhost:5000/permission/delete/${permissionToDelete._id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setPermissions(permissions.filter((p) => p._id !== permissionToDelete._id))
          if ((currentPage - 1) * itemsPerPage >= permissions.length - 1) {
            setCurrentPage((prev) => Math.max(prev - 1, 1))
          }
          console.log('Permission deleted successfully')
        } else {
          console.error('Failed to delete permission')
        }
      } catch (error) {
        console.error('Error deleting permission:', error)
      }
      setShowDeleteConfirmation(false)
    }
  }

  const confirmDelete = (perm) => {
    setPermissionToDelete(perm)
    setShowDeleteConfirmation(true)
  }

  const handlePermissionUpdated = (updatedPermission) => {
    setPermissions(permissions.map((perm) => (perm._id === updatedPermission._id ? updatedPermission : perm)))
    setShowEditPermission(false)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const normalizeString = (str) => 
    str.toLowerCase().replace(/[-\s]/g, '')
  const filteredPermissions = permissions.filter((perm) =>
    normalizeString(perm.name).includes(normalizeString(searchTerm))
)

  const indexOfLastPermission = currentPage * itemsPerPage
  const indexOfFirstPermission = indexOfLastPermission - itemsPerPage
  const currentPermissions = filteredPermissions.slice(indexOfFirstPermission, indexOfLastPermission)
  const totalPages = Math.ceil(filteredPermissions.length / itemsPerPage)
 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
<div className='bg-white min-h-screen w-full relative'>
<div className='w-full p-2 bg-white rounded-lg'>
          <h2 className="text-xl font-semibold text-left text-black-600 mb-6">
            Permission Management
          </h2>

          <div className="flex justify-between items-center mb-2">
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />


            <button
              className="bg-indigo-600 text-white p-2 rounded-2xl hover:bg-indigo-700 transition duration-300 mb-6"
              onClick={() => setShowCreatePermission(true)}
            >
              + CREATE PERMISSION
            </button>
          </div>

          <div className="overflow-x-auto">
          </div>
        </div>


                <TableComponent columns={columns} 
                data={currentPermissions.map((company, index) => ({
                  ...company,
                  serialNumber: (currentPage - 1) * itemsPerPage + index + 1
                }))} 
                actions={(permission) => (
                  <ActionButtons 
                    item={permission}
                    onEdit={handleEdit} 
                    onDelete={confirmDelete}
                  />
                )}
                     />
            
    

      {showCreatePermission && (
        <div className="fixed inset-0 flex justify-center items-center  z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} >
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
            <button
              className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowCreatePermission(false)}
            >
             <IoMdCloseCircleOutline className='text-2xl'/>
            </button>
            <CreatePermission
              onClose={() => setShowCreatePermission(false)}
              onPermissionCreated={handlePermissionCreated}
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
      

      {showEditPermission && (
        <div className="fixed inset-0 flex justify-center items-center  z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} >
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
            <button
              className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowEditPermission(false)}
            >
             <IoMdCloseCircleOutline className='text-2xl'/>
             </button>
            <EditPermission
              permission={editPermissionData}
              onClose={() => setShowEditPermission(false)}
              onPermissionUpdated={handlePermissionUpdated}
            />
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="absolute inset-0 flex justify-center items-center bg-white-500 bg-opacity-50">
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[400px] border border-gray-200">
            <h2 className="text-lg text-center font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this permission?
            </h2>
            <div className="flex justify-around">
              <button
                onClick={handleDelete}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PermissionList
