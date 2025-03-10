import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'
import TableComponent from '../components/TableComponent'

const CategoryTable = () => {
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/category/all')
      if (!response.ok) throw new Error('Failed to fetch data')
      const data = await response.json()
      console.log('Fetched Categories:', data)
      setCategories(Array.isArray(data) ? data.filter(category => category && category._id) : [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const confirmDelete = (category) => {
    setCategoryToDelete(category)
    setShowDeleteConfirmation(true)
  }

  const handleDelete = async () => {
    if (categoryToDelete) {
      try {
        const response = await fetch(`http://localhost:5000/category/delete/${categoryToDelete._id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setCategories(categories.filter((category) => category._id !== categoryToDelete._id))
        }
      } catch (error) {
        console.error('Error deleting category:', error)
      }
      setShowDeleteConfirmation(false)
    }
  }

  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Name', key: 'category_name' },
    { label: 'Description', key: 'description' },
    { label: 'Status', key: 'status' },
  ]

  const indexOfLastCategory = currentPage * itemsPerPage
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory)
  const totalPages = Math.ceil(categories.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const actions = (category) => (
    <>
      <button
        className="text-black-600 hover:text-indigo-700 font-bold py-1 px-3 rounded mr-2 text-xl"
      >
        <FaEdit />
      </button>
      <button
        className="text-black-600 hover:text-red-700 font-bold py-1 px-3 rounded mr-2 text-xl"
        onClick={() => confirmDelete(category)}
      >
        <RiDeleteBin6Line />
      </button>
    </>
  )

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>
      <button
        className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300 mb-6"
        onClick={() => navigate('/category-create')}
      >
        + CREATE Category
      </button>

      {/* Table Component */}
      <TableComponent
        columns={columns}
        data={currentCategories.map((category, index) => ({
          ...category,
          serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
        }))}
        actions={actions}
      />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 text-white bg-indigo-600 rounded-l-lg hover:bg-indigo-700"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-white ${currentPage === index + 1 ? 'bg-indigo-600' : 'bg-indigo-400'} hover:bg-indigo-500`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-700"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default CategoryTable