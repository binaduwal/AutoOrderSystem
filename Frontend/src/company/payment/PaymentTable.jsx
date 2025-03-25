import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import Pagination from '../../components/Pagination'
import CreatePayment from './CreatePayment'
import { IoMdCloseCircleOutline } from "react-icons/io"
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'
import EditPayment from './EditPayment'


const PaymentTable = () => {
const [payment,setPayment]=useState([])
const [currentPage, setCurrentPage] = useState(1)
const [showCreate, setShowCreate] = useState(false)
const [showDeleteConfirmation,setShowDeleteConfirmation]=useState(false)
const [DeleteData, setDeleteData] = useState(null)
const [showEdit, setShowEdit] = useState(false)
const [editData, setEditData] = useState(null)
 
const itemsPerPage=5

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

const indexOfLast = currentPage * itemsPerPage
const indexOfFirst = indexOfLast - itemsPerPage
const currentData = payment.slice(indexOfFirst, indexOfLast)
const totalPages = Math.ceil(payment.length / itemsPerPage)

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber)
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
        <h1 className='text-xl font-semibold text-left text-black-600 mb-4'>Unit Management</h1>
        <button className='bg-indigo-700 text-white p-2 rounded-lg hover:bg-indigo-500 transition duration-400'
        onClick={()=>setShowCreate(true)}
        >+Create Payment mode</button>

    </div>

    <div className='overflow-x-auto'>
        <table className='w-full border-collapse border border-gray-50'>
            <thead className='bg-white-200'>
                <tr>
                    <th className='border border-gray-100 p-2'>SN</th>
                    <th className='border border-gray-100 p-2'>Name</th>
                    <th className='border border-gray-100 p-2'>Status</th>
                    <th className='border border-gray-100 p-2'>Actions</th>
                </tr>
            </thead>
            <tbody>
            {currentData.length > 0 ? 
            (currentData.map((payment,index)=>(
                <tr>
                    <td key={payment._id} className='border border-gray-100 p-2'>{index + 1 + indexOfFirst}</td>
                    <td className='border border-gray-100 p-2'>{payment.name}</td>
                    <td className='border border-gray-100 p-2'>{payment.status}</td>
                    <td className='border border-gray-100 p-2'>
                        <button className='text-black-600 hover:text-indigo-800 mr-4'
                    onClick={() => handleEdit(payment)}

                        >
                            <FaEdit/>
                        </button>

                        <button className='text-black-600 hover:text-red-800 mr-4'
                        onClick={()=>confirmDelete(payment)}
                        >
                            <RiDeleteBin6Line/>
                        </button>
                    </td>
                </tr>

            ))
        ):(
                <tr>
                    <td colSpan="5" className='text-center p-4 text-gray-500'>
                    No units Available
                    </td>
                </tr>
        )}
            </tbody>
        </table>

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
          <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
              <button
                className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowCreate(false)}
              >
                <IoMdCloseCircleOutline className="text-2xl" />
              </button>
              <CreatePayment OnCreated={handleCreated} />
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
              <EditPayment paymentData={editData} onUpdated={handleUpdated} />
            </div>
          </div>
        )}

    </div>
</div>
)
}

export default PaymentTable