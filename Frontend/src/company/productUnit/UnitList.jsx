import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { IoMdCloseCircleOutline } from "react-icons/io";
import CreateUnit from "../productUnit/CreateUnit"
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'
import EditUnit from './EditUnit';
import TableComponent from '../../components/TableComponent'
import ActionButtons from '../../components/ActionButtons'
import SearchBar from '../../components/SearchBar'


const UnitList = () => {
const [units,setUnits]=useState([])
const [showDeleteConfirmation,setShowDeleteConfirmation]=useState(false)
const [DeleteData, setDeleteData] = useState(null);
const [showCreate, setShowCreate] = useState(false)
const [currentPage, setCurrentPage] = useState(1)
const [showEdit, setShowEdit] = useState(false)
const [editData, setEditData] = useState(null)
const [searchTerm, setSearchTerm] = useState('')


const itemsPerPage = 5

useEffect(()=>{
    fetchDetails()
},[])

const fetchDetails=async()=>{
    try{
        const response=await fetch('http://localhost:5000/unit/all')
        if(response.ok)
        {
            const data=await response.json()
            setUnits(data)
        }
        else{
            console.error("Failed to fetch permissions")
        }
        
}
catch (error) {
    console.error("Error fetching permissions:", error)
}
}

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const handleCreated=(newUnit) => {
    setUnits(prev=>[...prev,newUnit])
    setShowCreate(false)

}

const confirmDelete=(unit)=>{
    setDeleteData(unit)
    setShowDeleteConfirmation(true)
}

const handleDelete=async()=>{
    if(DeleteData){
        try{
            const response=await fetch(`http://localhost:5000/unit/delete/${DeleteData._id}`,{
                method:'DELETE'
            })

            if(response.ok)
            {
             setUnits(units.filter((p)=>p._id!==DeleteData._id))
             if ((currentPage - 1) * itemsPerPage >= units.length - 1) {
                setCurrentPage((prev) => Math.max(prev - 1, 1));
              }
              console.log('Data deleted successfully');
            } else {
              console.error('Failed to delete Data');
            }
          } catch (error) {
            console.error('Error deleting Data:', error);
          }
          setShowDeleteConfirmation(false);
                }
        }

const handleEdit=(unit)=>{
  setEditData(unit)
  setShowEdit(true)
}

const handleUpdated=async()=>{
  await fetchDetails()
  setShowEdit(false)
}

const columns = [
  { label: 'SN', key: 'serialNumber' },
  { label: 'Name', key: 'unitName' },
  { label: 'Status', key: 'status' },
]

const handleSearch = (e) => {
  setSearchTerm(e.target.value)
  setCurrentPage(1)
}

const normalizeString = (str = "") => str.toLowerCase().replace(/[-\s]/g, '')
const filtered = units.filter((unit) =>
  normalizeString(unit.unitName || '').includes(normalizeString(searchTerm))
)
const indexOfLast = currentPage * itemsPerPage
const indexOfFirst = indexOfLast - itemsPerPage
const currentData = filtered.slice(indexOfFirst, indexOfLast)
const totalPages = Math.ceil(filtered.length / itemsPerPage)


  return (
    <div>
    <div className="relative w-full min-h-screen bg-white">
      <div className="w-full p-2 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-semibold text-left text-black-600 mb-4">
          Unit Management
        </h1>
        <div className="flex justify-between items-center mb-2">

        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

        <button
            className="bg-indigo-600 text-white p-2 mb-3 rounded-2xl hover:bg-indigo-500 transition duration-400"
            onClick={() => setShowCreate(true)}
          >
            + Add Unit
          </button>
          </div>

        <div className="overflow-x-auto">
      <TableComponent
        columns={columns}
        data={currentData.map((units, index) => ({
          ...units,
          serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
        }))}
        actions={(units) => (
          <ActionButtons 
            item={units}
            onEdit={handleEdit} 
            onDelete={confirmDelete}
          />
        )}
      />


              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
        
        </div>

        <DeleteConfirmationModal
          isOpen={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={handleDelete}
        />


        {showCreate && (
          <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowCreate(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <CreateUnit onCreated={handleCreated} />
            </div>
          </div>
        )}

        {showEdit && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[700px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowEdit(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <EditUnit unitData={editData} onUpdated={handleUpdated} />
            </div>
          </div>
        )}
      </div>
    </div>
    </div>

  )
}

export default UnitList