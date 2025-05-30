  import React, { useEffect, useState } from 'react'
  import { FaEdit } from 'react-icons/fa'
  import { RiDeleteBin6Line } from 'react-icons/ri'
  import { IoMdCloseCircleOutline } from "react-icons/io"
  import DeleteConfirmationModal from '../components/DeleteConfirmationModal'
  import TableComponent from '../components/TableComponent'
  import EditCategory from './EditCategory'
  import CategoryForm from './CategoryForm'
  import { IoMdAddCircleOutline } from "react-icons/io"
  import NestedCategory from './NestedCategory'
  import Pagination from '../components/Pagination'
  import { CiSearch } from "react-icons/ci"
  import BASE_URL from '../config'


  const CategoryTable = () => {
  const [categories, setCategories] = useState([])
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [showEdit, setShowEdit] = useState(false)
  const [editData, setEditData] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showNestedForm, setShowNestedForm] = useState(false)
  const [selectedParentCategory, setSelectedParentCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

    const itemsPerPage = 5

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/category/all?parent=true`)
        if (!response.ok) throw new Error('Failed to fetch data')
        const data = await response.json()
        setCategories(Array.isArray(data) ? data.filter(category => category && category._id) : [])
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    useEffect(() => {
      fetchCategories()
    }, [])

    const handleEdit = (category) => {
      setEditData(category)
      setShowEdit(true)
    }

    const handleUpdated = (updatedCategory) => {
      setCategories(categories.map(cat => (cat._id === updatedCategory._id ? updatedCategory : cat)))
      setShowEdit(false)
    }

    const confirmDelete = (category) => {
      setCategoryToDelete(category)
      setShowDeleteConfirmation(true)
    }

const handleDelete = async () => {
  if (categoryToDelete) {
    try {
      const response = await fetch(`${BASE_URL}/category/delete/${categoryToDelete._id}`, {
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

const handleSearch = (e) => {
  setSearchTerm(e.target.value)
  setCurrentPage(1)
}

const normalizeString = (str) => str.toLowerCase().replace(/[-\s]/g, '')

const filtered = categories.filter((category) =>
  normalizeString(category.category_name).includes(normalizeString(searchTerm))
)

  

const indexOfLastCategory = currentPage * itemsPerPage
const indexOfFirstCategory = indexOfLastCategory - itemsPerPage
const currentCategories = filtered.slice(indexOfFirstCategory, indexOfLastCategory)
const totalPages = Math.ceil(filtered.length / itemsPerPage)

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber)
}

const actions = (category) => (
  <>
    <button
      className="text-black-600 hover:text-indigo-700 font-bold py-1 px-3 rounded mr-2 text-xl"
      onClick={() => {
        setSelectedParentCategory(category)
        setShowNestedForm(true)
      }}      >
    <IoMdAddCircleOutline />
</button>
    <button
      className="text-black-600 hover:text-indigo-700 font-bold py-1 px-3 rounded mr-2 text-xl"
      onClick={() => handleEdit(category)}
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
<div className='bg-white min-h-screen w-full relative'>
<div className='w-full p-2 bg-white rounded-lg'>

<h2 className="text-xl font-semibold text-left text-black-600 mb-4 mt-10">Manage Categories</h2>
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
    onClick={() => setShowCreateForm(true)}
  >
    + Create Category
  </button>
</div>

        {/* Table Component */}
        <TableComponent
          columns={columns}
          data={currentCategories.map((category, index) => ({
            ...category,
            serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
          }))}
          actions={actions}
        />

        {/* <div className="flex justify-center mt-6">
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
        </div> */}

          {showCreateForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
    >
              <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px]">
                <button
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                  onClick={() => setShowCreateForm(false)}
                >
                  <IoMdCloseCircleOutline className="text-2xl" />
                </button>
                <CategoryForm onClose={() => setShowCreateForm(false)}
                onCategoryCreated={fetchCategories} />
              </div>
            </div>
          )}

  {showEdit && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
  >
      <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px]">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={() => setShowEdit(false)}
        >
          <IoMdCloseCircleOutline className="text-2xl" />
        </button>
        <EditCategory
          category={editData}
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

<Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />

  {showNestedForm && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
    >
      <div className="relative bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={() => setShowNestedForm(false)}
        >
          <IoMdCloseCircleOutline className="text-2xl" />
        </button>
        <h3 className="text-lg font-bold mb-4">
          Add Sub-categories for: {selectedParentCategory.category_name}
        </h3>
        <NestedCategory
          parentId={selectedParentCategory._id}
          onClose={() => setShowNestedForm(false)}
        />
      </div>
    </div>
  )}
</div>
      </div>
    )
  }

  export default CategoryTable
