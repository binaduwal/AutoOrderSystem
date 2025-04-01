import React, { useState, useEffect } from 'react'
import TableComponent from '../../components/TableComponent'
import Pagination from '../../components/Pagination'
import { CiSearch } from "react-icons/ci"
import CreateEntityModal from '../../components/CreateEntityModal'
import CreatePartyGroup from './CreatePartyGroup'
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'
import ActionButtons from '../../components/ActionButtons'
import EditEntityModal from '../../components/EditEntityModal'
import EditPartyGroup from './EditPartyGroup'
import SearchBar from '../../components/SearchBar'


const PartyGroupTable = () => {
  const [partyGroups, setPartyGroups] = useState([])
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
      const response = await fetch('http://localhost:5000/partygroup/all')
      if (response.ok) {
        const data = await response.json()
        setPartyGroups(Array.isArray(data) ? data.filter(pg => pg && pg._id) : [])
      } else {
        console.error("Failed to fetch data")
      }
    } catch (error) {
      console.error("Error fetching party groups:", error)
    }
  }

  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Name', key: 'partyGroupName' },
    { label: 'Status', key: 'status' },
  ]

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const normalizeString = (str = "") => str.toLowerCase().replace(/[-\s]/g, '')
  const filtered = partyGroups.filter((group) =>
    normalizeString(group.partyGroupName || '').includes(normalizeString(searchTerm))
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
        const response = await fetch(`http://localhost:5000/partygroup/delete/${deleteData._id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setPartyGroups(partyGroups.filter(pg => pg._id !== deleteData._id))
        }
      } catch (error) {
        console.error('Error deleting party group:', error)
      }
      setShowDeleteConfirmation(false)
    }
  }

  const handleCreated = (newGroup) => {
    setPartyGroups(prev => [...prev, newGroup])
    setShowCreateForm(false)
  }

  const confirmDelete = (partygroup) => {
    setDeleteData(partygroup)
    setShowDeleteConfirmation(true)
  }

  const handleEdit = (partygroup) => {
    setEditData(partygroup)
    setShowEdit(true)
  }

  const handleUpdated = async () => {
    await fetchDetails()
    setShowEdit(false)
  }


  return (
<div className='bg-white min-h-screen w-full relative'>
    <div className='w-full p-2 bg-white rounded-lg'>
      <h2 className="text-xl font-semibold text-left text-black-600 mb-4 mt-10">Manage Party Group</h2>
      <div className="flex justify-between items-center mb-2">
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

        <button
          className="bg-indigo-600 text-white p-2 rounded-2xl hover:bg-indigo-700 transition duration-300 mb-6"
          onClick={() => setShowCreateForm(true)}
        >
          + Add Party Group
        </button>
      </div>

      <TableComponent
        columns={columns}
        data={currentData.map((group, index) => ({
          ...group,
          serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
        }))}
        actions={(group) => (
          <ActionButtons 
            item={group}
            onEdit={handleEdit} 
            onDelete={confirmDelete}
          />
        )}
      />

      <CreateEntityModal
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onCreated={handleCreated}
        Component={CreatePartyGroup}
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
  Component={EditPartyGroup}  
/>


      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
      />
    </div>
    </div>
  )
}

export default PartyGroupTable
