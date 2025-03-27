import React, { useState, useEffect } from 'react'
import TableComponent from '../../components/TableComponent'
import Pagination from '../../components/Pagination'
import CreateEntityModal from '../../components/CreateEntityModal'
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'
import ActionButtons from '../../components/ActionButtons'
import EditEntityModal from '../../components/EditEntityModal'
import SearchBar from '../../components/SearchBar'
import CreateSalesperson from './CreateSalesperson'
import EditSalesperson from './EditSalesperson'


const PartyGroupTable = () => {
  const [salesperson, setSalesperson] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [deleteData, setDeleteData] = useState(null)
const [showEdit, setShowEdit] = useState(false)
const [editData, setEditData] = useState(null)
const [searchTerm, setSearchTerm] = useState('')
  
  const itemsPerPage = 5

  useEffect(() => {
    fetchDetails()
  }, [])

  const fetchDetails = async () => {
    try {
      const response = await fetch('http://localhost:5000/salesperson/all')
      if (response.ok) {
        const data = await response.json()
        setSalesperson(Array.isArray(data) ? data.filter(pg => pg && pg._id) : [])
      } else {
        console.error("Failed to fetch data")
      }
    } catch (error) {
      console.error("Error fetching salesperson:", error)
    }
  }

  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Name', key: 'name' },
    { label: 'Status', key: 'status' },
  ]

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const normalizeString = (str = "") => str.toLowerCase().replace(/[-\s]/g, '')
  const filtered = salesperson.filter((sp) =>
    normalizeString(sp.name || '').includes(normalizeString(searchTerm))
  )
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentData = filtered.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleDelete = async () => {
    if (deleteData) {
      try {
        const response = await fetch(`http://localhost:5000/salesperson/delete/${deleteData._id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setSalesperson(salesperson.filter(pg => pg._id !== deleteData._id))
        }
      } catch (error) {
        console.error('Error deleting salesperson', error)
      }
      setShowDeleteConfirmation(false)
    }
  }

  const handleCreated = (newData) => {
    setSalesperson(prev => [...prev, newData])
    setShowCreateForm(false)
  }

  const confirmDelete = (newData) => {
    setDeleteData(newData)
    setShowDeleteConfirmation(true)
  }

  const handleEdit = (newData) => {
    setEditData(newData)
    setShowEdit(true)
  }

  const handleUpdated = async () => {
    await fetchDetails()
    setShowEdit(false)
  }


  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Salesperson</h2>
      <div className="flex justify-between items-center mb-2">
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

        <button
          className="bg-indigo-600 text-white p-2 rounded-2xl hover:bg-indigo-700 transition duration-300 mb-6"
          onClick={() => setShowCreateForm(true)}
        >
          + Create Salesperson
        </button>
      </div>

      <TableComponent
        columns={columns}
        data={currentData.map((salesperson, index) => ({
          ...salesperson,
          serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
        }))}
        actions={(salesperson) => (
          <ActionButtons 
            item={salesperson}
            onEdit={handleEdit} 
            onDelete={confirmDelete}
          />
        )}
      />

      <CreateEntityModal
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onCreated={handleCreated}
        Component={CreateSalesperson}
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
  Component={EditSalesperson}  
/>


      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default PartyGroupTable
