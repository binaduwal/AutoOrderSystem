import React, { useState, useEffect } from "react";

const EditAddress = ({ locationId, onUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    province: "",
    city: "",
    address: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("http://localhost:5000/province/all");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`http://localhost:5000/location/${locationId}`);
        const data = await response.json();
        setFormData({
          province: data.province._id,
          city: data.city._id,
          address: data.address,
        });
      } catch (error) {
        console.error("Error fetching location details:", error);
      }
    };
    fetchLocation();
  }, [locationId]);

  useEffect(() => {
    const fetchCities = async () => {
      if (formData.province) {
        try {
          const response = await fetch(`http://localhost:5000/city/province/${formData.province}`);
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
    };
    fetchCities();
  }, [formData.province]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/location/edit/${locationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedAddress = await response.json();
        onUpdated(updatedAddress.updatedLocation);
      } else {
        console.log("Failed to update address");
      }
    } catch (error) {
      console.error("Error while updating address", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="block text-gray-700 font-medium">Province</label>
          <select
            value={formData.province}
            onChange={(e) => setFormData({ ...formData, province: e.target.value, city: "" })}
            className="w-full p-1 border border-gray-500 rounded-lg"
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province._id} value={province._id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="block text-gray-700 font-medium">City</label>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full p-1 border border-gray-500 rounded-lg"
          >
            <option value="">Select City</option>
            {cities.length > 0 ? (
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

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex justify-between">
          <button type="submit" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
            Update Address
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAddress;
