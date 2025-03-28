import React, { useState, useEffect } from 'react'
import TableComponent from '../../components/TableComponent'
import Pagination from '../../components/Pagination'
import { CiSearch } from "react-icons/ci"
import CreateParty from './CreateParty'
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'
import ActionButtons from '../../components/ActionButtons'
import EditParty from './EditParty'
import { IoMdCloseCircleOutline } from "react-icons/io"

const PartyTable = () => {
  const [parties, setParties] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showCreate, setShowCreate] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [deleteData, setDeleteData] = useState(null)
  const [showEdit, setShowEdit] = useState(false)
  const [editData, setEditData] = useState(null)

  const itemsPerPage = 5

  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Party Name', key: 'partyName' },
    { label: 'Email', key: 'email' },
    { label: 'Contact Person', key: 'contactPerson' },
    { label: 'Route', key: 'routeId' },
    { label: 'Status', key: 'status' },
  ]

  const [searchTerm, setSearchTerm] = useState('')
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const normalizeString = (str) => str.toLowerCase().replace(/[-\s]/g, '')

  const filtered = parties.filter((party) =>
    normalizeString(party.partyName).includes(normalizeString(searchTerm))
  )
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = filtered.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleCreated = (newParty) => {
    setParties((prev) => [...prev, newParty])
    setShowCreate(false)
  }

  const handleEdit = (party) => {
    setEditData(party)
    setShowEdit(true)
  }

  const handleUpdated = async () => {
    await fetchDetails()
    setShowEdit(false)
  }

  useEffect(() => {
    fetchDetails()
  }, [])

  const fetchDetails = async () => {
    try {
      const response = await fetch('http://localhost:5000/party/all')
      if (response.ok) {
        const { data } = await response.json()
        setParties(Array.isArray(data) ? data : [])
      } else {
        console.error("Failed to fetch data")
      }
    } catch (error) {
      console.error("Error fetching Party details:", error)
    }
  }

  const confirmDelete = (party) => {
    setDeleteData(party)
    setShowDeleteConfirmation(true)
  }

  const handleDelete = async () => {
    if (deleteData) {
      try {
        const response = await fetch(`http://localhost:5000/party/delete/${deleteData._id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setParties(parties.filter((p) => p._id !== deleteData._id))
        }
      } catch (error) {
        console.error('Error deleting data', error)
      }
      setShowDeleteConfirmation(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Manage Party</h2>
      <div className="flex justify-between items-center mb-2">
        <div className="relative w-1/4">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 p-2 border border-gray-300 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          className="bg-indigo-600 text-white p-2 rounded-2xl hover:bg-indigo-700 transition duration-300 mb-6"
          onClick={() => setShowCreate(true)}
        >
          + Create Party
        </button>
      </div>

      <TableComponent
        columns={columns}
        data={currentData.map((party, index) => ({
          ...party,
          serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
          routeId: party.routeId?.routename || party.routeId || 'N/A',
        }))}
        actions={(party) => (
          <ActionButtons 
            item={party}
            onEdit={handleEdit} 
            onDelete={confirmDelete}
          />
        )}
      />

      {showEdit && editData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[800px]">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setShowEdit(false)}
            >
              <IoMdCloseCircleOutline className="text-2xl" />
            </button>
            <EditParty
              partyId={editData._id}
              onClose={() => setShowEdit(false)}
              onUpdated={handleUpdated}
            />
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
      />

      {showCreate && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[800px] border border-gray-200">
            <button
              className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowCreate(false)}
            >
              <IoMdCloseCircleOutline className="text-2xl" />
            </button>
            <CreateParty onCreated={handleCreated} />
          </div>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default PartyTable
