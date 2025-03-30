import React, { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination'
import CreatePayment from './CreatePayment'
import { IoMdCloseCircleOutline } from "react-icons/io"
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'
import EditPayment from './EditPayment'
import TableComponent from '../../components/TableComponent'
import SearchBar from '../../components/SearchBar'
import ActionButtons from '../../components/ActionButtons'



const PaymentTable = () => {
const [payment,setPayment]=useState([])
const [currentPage, setCurrentPage] = useState(1)
const [showCreate, setShowCreate] = useState(false)
const [showDeleteConfirmation,setShowDeleteConfirmation]=useState(false)
const [DeleteData, setDeleteData] = useState(null)
const [showEdit, setShowEdit] = useState(false)
const [editData, setEditData] = useState(null)
const [searchTerm, setSearchTerm] = useState('')
 

const itemsPerPage=5
const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const normalizeString = (str = "") => str.toLowerCase().replace(/[-\s]/g, '')
  const filtered = payment.filter((sp) =>
    normalizeString(sp.name || '').includes(normalizeString(searchTerm))
  )

  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentData = filtered.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Name', key: 'name' },
    { label: 'Status', key: 'status' },
  ]


useEffect(()=>{
    fetchDetails()
},[])

const fetchDetails=async()=>{
try {
    const response=await fetch('http://localhost:5000/paymentmode/all')
    if(response.ok){
        const data=await response.json()
        setPayment(data)
    }
    else{
        console.error("Failed to fetch data")
    
    }
} catch (error) {
    console.error("Error fetching permissions:", error)
}
}


const handleCreated=(newPayment)=>{
    setPayment(prev=>[...prev,newPayment])
    setShowCreate(false)
}


const handleDelete=async()=>{
    if(DeleteData){
        try {
            const response=await fetch(`http://localhost:5000/paymentmode/delete/${DeleteData._id}`,{
                method:'DELETE'
            })

        if(response.ok)
        {
            setPayment(payment.filter((p)=>p._id!=DeleteData._id))
            if((currentPage-1)*itemsPerPage>=payment.length-1){
            setCurrentPage((prev)=>Math.max(prev-1),1)
        }
        console.log('Data deleted successfully')
    }
        else{
            console.error('Failed to delete Data')
        
        }
        } catch (error) {
            console.error('Error deleting Data:', error)
        }
        setShowDeleteConfirmation(false)
    }
    
    }

const confirmDelete=(payment)=>{
    setDeleteData(payment)
    setShowDeleteConfirmation(true)
}

const handleEdit=(unit)=>{
    setEditData(unit)
    setShowEdit(true)
  }
  
  const handleUpdated=async()=>{
    await fetchDetails()
    setShowEdit(false)
  }
  


  return (
<div className='bg-white min-h-screen w-full relative'>
    <div className='w-full p-2 bg-white rounded-lg'>
        <h1 className='text-xl font-semibold text-left text-black-600 mb-4 mt-10'>Payment Management</h1>
    <div className="flex justify-between items-center mb-2">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        
        <button 
          className="bg-indigo-600 text-white p-2 rounded-2xl hover:bg-indigo-700 transition duration-300 mb-6"
          onClick={()=>setShowCreate(true)}
        >+Create</button>
      </div>
      </div>

    <div className='overflow-x-auto'>
      <TableComponent
        columns={columns}
        data={currentData.map((payment, index) => ({
          ...payment,
          serialNumber: (currentPage - 1) * itemsPerPage + index + 1,
        }))}
        actions={(payment) => (
          <ActionButtons 
            item={payment}
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

<DeleteConfirmationModal
          isOpen={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={handleDelete}
        />


{showCreate && (
          <div className="fixed inset-0 flex justify-center items-center z-50" 
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowCreate(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <CreatePayment 
              OnCreated={handleCreated} />
            </div>
          </div>
        )}

{showEdit && (
          <div className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowEdit(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <EditPayment paymentData={editData} onUpdated={handleUpdated} />
            </div>
          </div>
        )}
     {/* <EditRouteModal
     isOpen={showEdit}
     onClose={()=> setShowEdit(false)}
     paymentData={editData}
     onUpdated={handleUpdated}
/>    */}

    </div>
</div>
)
}

export default PaymentTable