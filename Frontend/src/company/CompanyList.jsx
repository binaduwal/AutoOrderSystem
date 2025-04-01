import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EditCompany from './EditCompany'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"
import PasswordForm from '../components/PasswordForm'
import TableComponent from '../components/TableComponent'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'


const CompanyList = () => {
  const navigate = useNavigate()

  const [companies, setCompanies] = useState([])
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [companyToDelete, setCompanyToDelete] = useState(null)
  const [showEditCompany, setShowEditCompany] = useState(null)
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)
  const [userForPasswordChange, setUserForPasswordChange] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
    
  const itemsPerPage = 5

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:5000/company/all')
      if (!response.ok) throw new Error('Failed to fetch data')
      const data = await response.json()
      console.log("Fetched Companies:", data)
      setCompanies(Array.isArray(data) ? data.filter(company => company && company._id) : [])
    } catch (error) {
      console.error('Error fetching company:', error)
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }


  const handleChangePassword=(company)=>{
    setUserForPasswordChange(company)
    setShowChangePasswordForm(true)
  }

  const closePasswordForm = () => {
    setShowChangePasswordForm(false)
    setUserForPasswordChange(null)
  }


  const confirmDelete = (company) => {
    setCompanyToDelete(company)
    setShowDeleteConfirmation(true)
  }

  const handleDelete = async () => {
    if (companyToDelete) {
      try {
        const response = await fetch(`http://localhost:5000/company/delete/${companyToDelete._id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setCompanies(companies.filter((company) => company._id !== companyToDelete._id))
        }
      } catch (error) {
        console.error('Error deleting Company:', error)
      }
      setShowDeleteConfirmation(false)
    }
  }

  const handleEdit = (company) => {
    setShowEditCompany(company._id)
  }

  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Company Name', key: 'companyName' },
    { label: 'Email', key: 'email' },
    { label: 'Contact Person', key: 'contactPerson' },
    { label: 'Contact Number', key: 'contactNumber' },
    { label: 'Tax Type', key: 'taxType' },
    { label: 'Status', key: 'status' },
  ]

  const normalizeString = (str = "") => str.toLowerCase().replace(/[-\s]/g, '')
  const filtered = companies.filter((sp) =>
    normalizeString(sp.companyName || '').includes(normalizeString(searchTerm))
  )


  const indexOfLastCompany = currentPage * itemsPerPage
  const indexOfFirstCompany = indexOfLastCompany - itemsPerPage
  const currentCompanies = filtered.slice(indexOfFirstCompany, indexOfLastCompany)
  const totalPages = Math.ceil(companies.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  const actions = (company) => (
    <>
      <button
        className="text-black-600 hover:text-indigo-700 font-bold py-1 px-3 rounded mr-2 text-xl"
        onClick={() => handleEdit(company)}
        
      >
        <FaEdit />
      </button>
      <button
        className="text-black-600 hover:text-red-700 font-bold py-1 px-3 rounded mr-2 text-xl"
        onClick={() => confirmDelete(company)}
      >
        <RiDeleteBin6Line />
      </button>
      <button
        onClick={() => handleChangePassword(company)}
        className="text-black-400 border hover:text-indigo-700 py-0 px-1 rounded"
      >
        Change Password
      </button>
    </>
  )


  return (
<div className='bg-white min-h-screen w-full relative'>
<div className='w-full p-2 bg-white rounded-lg'>

<h2 className="text-xl font-semibold text-left text-black-600 mb-4 mt-5">Manage Company</h2>
<div className="flex justify-between items-center mb-2">

      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

      <button
        className="bg-indigo-600 text-white p-2 rounded-2xl hover:bg-indigo-700 transition duration-300 mb-6"
        onClick={() => navigate('/admin/create-company')}
      >
        + CREATE Company
      </button>
</div>
    <TableComponent columns={columns} 
    data={currentCompanies.map((company, index) => ({
      ...company,
      serialNumber: (currentPage - 1) * itemsPerPage + index + 1
    }))} 
    actions={actions}
     />

      {showEditCompany && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 overflow-y-auto"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
          <div className="relative bg-white p-6 rounded-xl shadow-2xl w-[600px] border border-gray-200">
            <button
              className="absolute top-4 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowEditCompany(null)}
            >
              <IoMdCloseCircleOutline size={30} />
            </button>
            <EditCompany
        companyId={showEditCompany}
        onCompanyUpdated={() => {
          fetchCompanies();
          setShowEditCompany(null);
        }}
        onClose={() => setShowEditCompany(null)}
      />
          </div>
        </div>
      )}

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

{showChangePasswordForm && (
        <PasswordForm
          adminId={userForPasswordChange._id}
          endpoint="http://localhost:5000/company/update-password"
          onClose={closePasswordForm}
        />
      )}

    </div>
    </div>
  )
}

export default CompanyList



