import React, { useState, useEffect } from "react";
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
    province: "",
    address: "",
    password: "",
    description: "",
    status: false,
  });

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]); 
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('http://localhost:5000/province/all');
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (formData.province) { 
        try {
          const response = await fetch(`http://localhost:5000/city/province/${formData.province}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log('Fetched Cities:', data); 
          
          if (Array.isArray(data)) {
            setCities(data); 
          } else {
            console.error('Invalid data format:', data);
            setCities([]); 
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
          setMessage("Failed to load cities. Please try again.");
        }
      }
    };
  
    fetchCities(); 
  }, [formData.province]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
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
        navigate('/admin/ company');
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
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select Province</option>
                {provinces.map((province) => (
                  <option key={province._id} value={province._id}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={!formData.province}  
              >
                <option value="">Select City</option>
                {Array.isArray(cities) && cities.length > 0 ? ( 
                  cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))
                ) : (
                  <option value="">No cities available</option>
                )}
              </select>
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