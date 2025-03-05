import React, { useState } from "react";

const CreateAddress = ({ onCreated }) => {
  const [formData, setFormData] = useState({
    province: "",
    city: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLocation = {
      province: formData.province,
      city: formData.city,
      address: formData.address,
    };

    try {
      const response = await fetch("http://localhost:5000/location/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLocation),
      });

      if (response.ok) {
        const createdAddress = await response.json();
        onCreated(createdAddress); 
      } else {
        console.log("Failed to create address");
      }
    } catch (error) {
      console.error("Error while creating address", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="province" className="block text-sm font-medium text-gray-700">
            Province
          </label>
          <input
            type="text"
            id="province"
            value={formData.province}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAddress;
