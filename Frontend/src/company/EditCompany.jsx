import React, { useState, useEffect } from 'react';


const EditCompany = ({ companyId, onClose, onCompanyUpdated }) => {
      const [formData, setFormData] = useState({
        companyName: "",
        email: "",
        contactNumber: "",
        contactPerson: "",
        taxNumber: "",
        taxType: "vat",
        city: "",
        province: "",
        address: "",
        password: "",
        description: "",
        status: false,
      });

        useEffect(() => {
          if (!companyId) return;
          const fetchDetails = async () => {
            try {
              const response = await fetch(`http://localhost:5000/company/edit/${companyId}`);
              if (response.ok) {
                const data = await response.json();
                setFormData({
                  companyName: data.companyName || "",
                  email: data.email || "",
                  contactNumber: data.contactNumber || "",
                  contactPerson: data.contactPerson || "",
                  taxNumber: data.taxNumber || "",
                  taxType: data.taxType || "PAN", 
                  city: data.city || "",
                  province: data.province || "",
                  address: data.address || "",
                  password: data.password || "",
                  description: data.description || "",
                  status: data.status === "Active", 
                });
                              } else {
                alert('Failed to fetch company details.');
              }
            } catch (error) {
              console.error('Error fetching:', error);
            }
          };
          fetchDetails();
        }, [companyId]);

        const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData((prevData) => ({
              ...prevData,
              [name]: type === 'checkbox' ? checked : value,
            }));
          };

          const handleSubmit = async (e) => {
            e.preventDefault();
        
            const payload = {
                companyName:formData.companyName ,
                email:formData.email ,
                contactNumber:formData.contactNumber ,
                contactPerson:formData.contactPerson ,
                taxNumber:formData.taxNumber ,
                taxType:formData.taxType,
                city:formData.city ,
                province:formData.province ,
                address:formData.address ,
                password:formData.password ,
                description:formData.description ,
                status: formData.status ? "Active" : "Inactive", 
              };
        
            try {
              const response = await fetch(`http://localhost:5000/company/edit/${companyId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
              });
              if (response.ok) {
                const result = await response.json();
                const updatedUser = result; 
                 alert('User updated successfully!');
                if (onCompanyUpdated) {
                  onCompanyUpdated(updatedUser);
                }
                if (onClose) {
                  onClose();
                }
              } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Update failed'}`);
              }
            } catch (error) {
              console.error('Error updating user:', error);
              alert('Error updating user!');
            }
          };
        
        
      
    
    return (
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-left mb-2">Edit Company</h2>   
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                  />
                </div>
    
                <div>
                  <label className="block text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                  />
                </div>
              </div>
    
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium">Contact Number</label>
                  <input
                    type="text"
                    name="contactNumber"
                    placeholder="Enter contact number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
    
                <div>
                  <label className="block text-gray-700 font-medium">Contact Person</label>
                  <input
                    type="text"
                    name="contactPerson"
                    placeholder="Enter contact person"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>
            </div>
    
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium">Tax Number</label>
                  <input
                    type="text"
                    name="taxNumber"
                    placeholder="Enter tax number"
                    value={formData.taxNumber}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
    
                <div>
                  <label className="block text-gray-700 font-medium">Tax Type</label>
                  <select
                    name="taxType"
                    value={formData.taxType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="VAT">VAT</option>
                    <option value="PAN">PAN</option>
                  </select>
                </div>
              </div>
            </div>
    <></>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium">Province</label>
                  <input
                    type="text"
                    name="province"
                    placeholder="Enter province"
                    value={formData.province}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
    
                <div>
                  <label className="block text-gray-700 font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
    
                <div className="space-y-2">
              <div>
                <label className="block text-gray-700 font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
    
            </div>

              </div>
            </div>
    
            <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

    
            <div className="space-y-2">
              <div>
                <label className="block text-gray-700 font-medium">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 h-16"
                ></textarea>
              </div>
    
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label className="text-gray-700 font-medium">Active</label>
              </div>
            </div>
    
            <div className="text-center mt-3">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Edit Company
              </button>
            </div>
          </form>
        </div>
      );
    }

export default EditCompany