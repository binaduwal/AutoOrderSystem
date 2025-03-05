import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const CreateCompany = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    contactNumber: "",
    contactPerson: "",
    taxNumber: "",
    taxType: "vat",
    city: "",
    state: "",
    province: "",
    address: "",
    password: "",
    description: "",
    status: false,
  });

const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        status: formData.status ? "Active" : "Inactive",  
        taxType: formData.taxType.toUpperCase(), 
      };
  
      const response = await fetch("http://localhost:5000/company/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("Company created successfully!");
        navigate('/company')
        setFormData({
          companyName: "",
          email: "",
          contactNumber: "",
          contactPerson: "",
          taxNumber: "",
          taxType: "VAT", 
          city: "",
          province: "",
          address: "",
          password: "",
          description: "",
          status: true,  
        });
      } else {
        console.error("Error Response:", result);
        setMessage(result.error || "Failed to create company.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-left mb-6">Create Company</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-black-700">Company Info</h3>
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

        <div className="space-y-4">
          <h3 className="text-xl font-medium text-black-700">Tax Info</h3>
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
                <option value="vat">VAT</option>
                <option value="pan">PAN</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium text-black-700">Location Info</h3>
          <div className="grid grid-cols-2 gap-4">
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

          </div>
        </div>

        <div className="space-y-4">
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

          <div>
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
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 h-24"
            ></textarea>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="text-gray-700 font-medium">Active</label>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Create Company
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCompany;
