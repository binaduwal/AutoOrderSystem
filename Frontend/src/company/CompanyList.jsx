import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import EditCompany from './EditCompany'
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';


const CompanyList = () => {
    const navigate = useNavigate();

    const [companies, setCompanies] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
        const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
        const [companyToDelete, setCompanyToDelete] = useState(null);
        const [showEditCompany, setShowEditCompany] = useState(null);
      
      const itemsPerPage = 5;

    
    const fetchCompanies = async () => {
        try {
          const response = await fetch('http://localhost:5000/company/all');
          if (!response.ok) throw new Error('Failed to fetch data');
          const data = await response.json();
          console.log("Fetched Companies:", data); 

          setCompanies(Array.isArray(data) ? data.filter(company => company && company._id) : []);
        } catch (error) {
          console.error('Error fetching company:', error);
        }
      };
    
        useEffect(() => {
            fetchCompanies();
        }, []);

        const confirmDelete = (company) => {
            setCompanyToDelete(company);
            setShowDeleteConfirmation(true);
          };
        

        const handleDelete = async () => {
            if (companyToDelete) {
              try {
                const response = await fetch(`http://localhost:5000/company/delete/${companyToDelete._id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                  setCompanies(companies.filter((company) => company._id !== companyToDelete._id));
                  if ((currentPage - 1) * itemsPerPage >= companies.length - 1) {
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                  }
                }
              } catch (error) {
                console.error('Error deleting Company:', error);
              }
              setShowDeleteConfirmation(false);
            }
          };

    const handleCompanyUpdated=(updatedCompany)=>{
      setCompanies((prevCompanies)=>
        prevCompanies.map((company)=>company._id===updatedCompany._id?updatedCompany:company))
        setShowEditCompany(null)

    }
        
      
      // Pagination calculations
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = companies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
    
    
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Company</h2>
      <button
        className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300 mb-6"
        onClick={() => navigate('/create-company')}
      >
        + CREATE Company
      </button>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-black-500 uppercase">SN</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-black-500 uppercase">Company Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-black-500 uppercase">Email</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-black-500 uppercase">Contact Person</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-black-500 uppercase">Contact Number</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-black-500 uppercase">Tax Type</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-black-500 uppercase">Status</th>
            <th className="px-4 py-3 text-center text-xs font-medium text-black-500 uppercase">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
    {currentUsers.map((company, index) => {
        if (!company || !company._id) return null; 
        return (
            <tr key={company._id}>
                <td className="px-4 py-3 text-sm text-black-500">{indexOfFirst + index + 1}</td>
                <td className="px-4 py-3 text-sm text-black-500">{company.companyName}</td>
                <td className="px-4 py-3 text-sm text-black-500">{company.email}</td>
                <td className="px-4 py-3 text-sm text-black-500">{company.contactPerson}</td>
                <td className="px-4 py-3 text-sm text-black-500">{company.contactNumber}</td>
                <td className="px-4 py-3 text-sm text-black-500">{company.taxType}</td>
                <td className="px-4 py-3 text-sm text-black-500">{company.status}</td>
                <td className="px-4 py-3 text-sm text-center text-black-500">
                    <button
className="text-black-600 hover:text-indigo-700 font-bold py-1 px-3 rounded mr-2 text-xl"
onClick={() => setShowEditCompany(company._id)}
                    >
                         <FaEdit />
                    </button>
                    <button
                  className="text-black-600 hover:text-red-700 font-bold py-1 px-3 rounded mr-2 text-xl"
                  onClick={() => confirmDelete(company)}
                    >
                                          <RiDeleteBin6Line />
                        
                    </button>
                </td>
            </tr>
        );
    })}
</tbody>        
      </table>
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

{showDeleteConfirmation && (
        <div className="absolute inset-0 flex justify-center items-center bg-white-500 bg-opacity-50">
          <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[400px] border border-gray-200">
            <h2 className="text-lg text-center font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this?
            </h2>
            <div className="flex justify-around">
              <button
                onClick={handleDelete}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
              onCompanyUpdated={handleCompanyUpdated}
              onClose={() => setShowEditCompany(null)}
            />
          </div>
        </div>
      )}


   </div>
  )
}

export default CompanyList