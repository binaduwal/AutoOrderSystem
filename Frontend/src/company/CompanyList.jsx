import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';


const CompanyList = () => {
    const navigate = useNavigate();

    const [companies, setCompanies] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
        const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
        const [companyToDelete, setCompanyToDelete] = useState(null);
      
      const itemsPerPage = 5;

    
    const fetchCompanies = async () => {
        try {
          const response = await fetch('http://localhost:5000/company/all');
          if (!response.ok) throw new Error('Failed to fetch data');
          const data = await response.json();
          setCompanies(data)
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
          {currentUsers.map((company, index) => (
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
                  className="text-indigo-600 hover:text-indigo-800 mr-2"
                  onClick={() => navigate(`/edit-company/${company._id}`)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => confirmDelete(company)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
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
              Are you sure you want to delete this permission?
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

   </div>
  )
}

export default CompanyList