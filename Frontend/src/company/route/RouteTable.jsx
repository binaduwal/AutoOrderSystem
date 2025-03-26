import React, {useState,useEffect } from 'react'
import TableComponent from '../../components/TableComponent'
import Pagination from '../../components/Pagination'
import { CiSearch } from "react-icons/ci"
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaEdit } from 'react-icons/fa'
import CreateRoute from './CreateRoute'
import { IoMdCloseCircleOutline } from "react-icons/io"
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'
import EditRoute from './EditRoute'


const RouteTable = () => {
    const [routes, setRoutes] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [deleteData, setDeleteData] = useState(null)
    const [showEdit, setShowEdit] = useState(false)
    const [editData, setEditData] = useState(null)
    
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

    const itemsPerPage = 5

    useEffect(()=>{
        fetchDetails()
    },[])
    
    const fetchDetails=async()=>{
    try {
        const response=await fetch('http://localhost:5000/route/all')
        if(response.ok){
            const data=await response.json()
            setRoutes(Array.isArray(data) ? data.filter(route => route && route._id) : [])
        }
        else{
            console.error("Failed to fetch data")
        
        }
    } catch (error) {
        console.error("Error fetching permissions:", error)
    }
    }
    
    const handleCreated=(newRoute)=>{
        setRoutes(prev=>[...prev,newRoute])
        setShowCreateForm(false)
    }
    
    const columns = [
        { label: 'SN', key: 'serialNumber' },
        { label: 'Name', key: 'routename' },
        { label: 'Status', key: 'status' },
        ]
    const [searchTerm, setSearchTerm] = useState('')
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
      }
      
      const normalizeString = (str = "") => str.toLowerCase().replace(/[-\s]/g, '');
      
      const filtered = routes.filter((route) =>
        normalizeString(route.routename || '').includes(normalizeString(searchTerm))
      );

      const indexOfLast = currentPage * itemsPerPage
      const indexOfFirst = indexOfLast - itemsPerPage
      const currentData = filtered.slice(indexOfFirst, indexOfLast)
      const totalPages = Math.ceil(filtered.length / itemsPerPage)
      
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
      }
      
const actions = (route) => (
  <>
    <button
      className="text-black-600 hover:text-indigo-700 font-bold py-1 px-3 rounded mr-1 text-xl"
      onClick={() => handleEdit(route)}
    >
      <FaEdit />
    </button>
    <button
      className="text-black-600 hover:text-red-700 font-bold py-1 px-3 rounded mr-2 text-xl"
      onClick={() => confirmDelete(route)}
    >
      <RiDeleteBin6Line />
    </button>
  </>
)
const confirmDelete = (route) => {
    setDeleteData(route)
    setShowDeleteConfirmation(true)
  }

const handleDelete = async () => {
if (deleteData) {
  try {
    const response = await fetch(`http://localhost:5000/route/delete/${deleteData._id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      setRoutes(routes.filter((route) => route._id !== deleteData._id))
    }
  } catch (error) {
    console.error('Error deleting route:', error)
  }
  setShowDeleteConfirmation(false)
}
}

const handleEdit=(route)=>{
    setEditData(route)
    setShowEdit(true)
  }
  
  const handleUpdated=async()=>{
    await fetchDetails()
    setShowEdit(false)
  }
  

 
    
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Manage Route</h2>
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
+ Create Route
</button>
</div>

    <TableComponent
      columns={columns}
      data={currentData.map((route, index) => ({
        ...route,
        serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
      }))}
      actions={actions}
    />

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
            <CreateRoute
            
            onClose={() => setShowCreateForm(false)}
            onCreated={handleCreated}
             />
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
    <EditRoute
      routeData={editData}
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


  </div>
)
}

export default RouteTable