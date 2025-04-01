import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import Pagination from '../../components/Pagination'
import { IoMdCloseCircleOutline } from "react-icons/io"
import CreateProduct from './CreateProduct'
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'
import EditProduct from './EditProduct'
import SearchBar from '../../components/SearchBar'


const ProductTable = () => {
const [products,setProducts]=useState([])
const [showCreate, setShowCreate] = useState(false)
const [currentPage, setCurrentPage] = useState(1)
const [showDeleteConfirmation,setShowDeleteConfirmation]=useState(false)
const [DeleteData, setDeleteData] = useState(null)
const [showEdit, setShowEdit] = useState(false)
const [editData, setEditData] = useState(null)
const [units, setUnits] = useState([])
const [categories, setCategories] = useState([])
const [searchTerm, setSearchTerm] = useState('')

const itemsPerPage = 5


useEffect(()=>{
    fetchDetails()
    fetchUnits()
    fetchCategories()
},[])

const fetchDetails=async()=>{
    try{
        const response=await fetch('http://localhost:5000/product/all')
        if(response.ok)
        {
            const data=await response.json()
            setProducts(Array.isArray(data) ? data : data.data || [])

        }
        else{
            console.error("Failed to fetch products")
        }
        
}
catch (error) {
    console.error("Error fetching products:", error)
}
}

const fetchUnits = async () => {
  try {
    const response = await fetch('http://localhost:5000/unit/all')
    const data = await response.json()
    if (Array.isArray(data)) {
      setUnits(data)
    } else {
      console.error("Unexpected response format:", data)
      setUnits([])
    }
  } catch (error) {
    console.error("Error fetching units:", error)
  }
}

const fetchCategories = async () => {
  try {
    const response = await fetch('http://localhost:5000/category/all')
    const data = await response.json()
    if (Array.isArray(data)) {
      setCategories(data)
    } else {
      console.error("Unexpected response format:", data)
      setCategories([])
    }
  } catch (error) {
    console.error("Error fetching units:", error)
  }
}

const handleSearch = (e) => {
  setSearchTerm(e.target.value)
  setCurrentPage(1)
}

const normalizeString = (str = "") => str.toLowerCase().replace(/[-\s]/g, '')
const filtered = products.filter((sp) =>
  normalizeString(sp.name || '').includes(normalizeString(searchTerm))
)


const indexOfLast = currentPage * itemsPerPage
const indexOfFirst = indexOfLast - itemsPerPage
const currentData = (filtered || []).slice(indexOfFirst, indexOfLast)
const totalPages = Math.ceil((products?.length || 0) / itemsPerPage)

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber)
}

const handleCreated= async (newProduct) => {
  await fetchDetails()
  setShowCreate(false)
}


const confirmDelete=(product)=>{
  setDeleteData(product)
  setShowDeleteConfirmation(true)
}

const handleDelete=async()=>{
  if(DeleteData)
  {
    try{
      const response=await fetch(`http://localhost:5000/product/delete/${DeleteData._id}`,{
                method:'DELETE'
    })
    if(response.ok){
      setProducts(products.filter((p)=>p._id!==DeleteData._id))
      if((currentPage-1)*itemsPerPage>= products.length-1){
        setCurrentPage((prev)=>Math.max(prev-1,1))
      }
      console.log('Data deleted successfully')
    }
     else {
              console.error('Failed to delete Data')
            }
    }

  catch (error) {
    console.error('Error deleting Data:', error)
  }
  setShowDeleteConfirmation(false)
  }
}

const handleEdit=(product)=>{
  setEditData(product)
  setShowEdit(true)
}

const handleUpdated=async()=>{
  await fetchDetails()
  setShowEdit(false)
}


    return (
<div className='bg-white min-h-screen w-full relative'>
    <div className='w-full p-2 bg-white rounded-lg'>
            <h1 className="text-xl font-semibold text-left text-black-600 mb-4 mt-10">
              Product Management
            </h1>
            <div className="flex justify-between items-center mb-2">
            <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

            <button
                className="bg-indigo-700 text-white p-2 mb-3 rounded-lg hover:bg-indigo-500 transition duration-400"
                onClick={() => setShowCreate(true)}
              >
                + Create Product
              </button>
              </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-50">
                <thead className=" bg-gray-50">
                  <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-black-700 uppercase">SN</th>

                <th className="px-3 py-3 text-left text-xs font-medium text-black-700 uppercase">Image</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-black-700 uppercase">Name</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-black-700 uppercase">Product Code</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-black-700 uppercase">Category</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-black-700 uppercase">Unit</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-black-700 uppercase">VATable</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-black-700 uppercase">Selling Price</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-black-700 uppercase">Discount</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-black-700 uppercase">Status</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-black-700 uppercase">Actions</th>

              </tr>
                </thead>
                <tbody>
                {currentData.length > 0 ? (
                  currentData.map((product, index) => {
                    return (
                      <tr key={product._id} className="text-center">
                        <td className="px-4 py-3 text-sm text-black-700">{index + 1 + indexOfFirst}</td>
                        <td className='p-2 text-center'>
                          {product.productImage ? (
                            <img
                              src={`http://localhost:5000/uploads/${product.productImage}`}
                              alt={product.name}
                              className='w-10 h-10 object-cover rounded-full mx-auto'
                              onError={(e) => {
                                e.target.onerror = null 
                                e.target.src = 'fallback-image-url'
                              }}
                            />                
                          ) : (
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 text-sm">N/A</span>
                            </div>
                          )}
                      </td>
                        <td className="px-4 py-3 text-sm text-black-700">{product.name}</td>
                        <td className="px-4 py-3 text-sm text-black-700">{product.productCode}</td>
                        <td className="px-4 py-3 text-sm text-black-700">
                          {categories.find(category=>category._id===product.categoryId)?.category_name||"N/A"}
                        </td>

                        <td className="px-4 py-3 text-sm text-black-700">
                          {units.find(unit => unit._id === product.productUnitId)?.unitName || "N/A"}
                        </td>  
                        <td className="px-4 py-3 text-sm text-black-700">{product.vatable ? "True" : "False"}</td>
                        <td className="px-4 py-3 text-sm text-black-700">{product.maxSellingPrice}</td>
                        <td className="px-4 py-3 text-sm text-black-700">{product.maxDiscount}</td>
                        <td className="px-4 py-3 text-sm text-black-700">{product.status}</td>
                        <td className="px-4 py-3 text-sm text-black-700">
                          <button
                            className="text-black-600 hover:text-indigo-800 mr-4"
                            onClick={() => handleEdit(product)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => confirmDelete(product)}
                            className="text-black-600 hover:text-red-800"
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center p-4 text-gray-500">
                      No Products available.
                    </td>
                  </tr>
                )}
              </tbody>              </table>
    
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
              <div className="fixed inset-0 flex justify-center items-center z-50"
               style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
                <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[700px] border border-gray-200">
                  <button
                    className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
                    onClick={() => setShowCreate(false)}
                  >
                    <IoMdCloseCircleOutline className="text-2xl" />
                  </button>
                  <CreateProduct onCreated={handleCreated} 
                  
                  />
                </div>
              </div>
            )}
    
            {showEdit && (
              <div className="fixed inset-0 flex justify-center items-center z-50" 
              style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
                <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[700px] border border-gray-200">
                  <button
                    className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
                    onClick={() => setShowEdit(false)}
                  >
                    <IoMdCloseCircleOutline className="text-2xl" />
                  </button>
                  <EditProduct productData={editData} onUpdated={handleUpdated}/>
                </div>
              </div>
            )}
          </div>
        </div>
    
      )
    }

export default ProductTable