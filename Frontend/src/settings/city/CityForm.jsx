import React, { useState, useEffect } from 'react';

const CityForm = () => {
  const [cityName, setCityName] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('http://localhost:5000/province/all');
        if (response.ok) {
          const data = await response.json();
          setProvinces(Array.isArray(data) ? data : data.provinces || []);
        } else {
          console.error('Failed to fetch provinces');
          setProvinces([]);
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !selectedProvince) {
      alert('Both city name and province must be selected!');
      return;
    }

    console.log('City Name:', cityName);
    console.log('Selected Province ID:', selectedProvince);

    try {
      const response = await fetch('http://localhost:5000/city/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: cityName,
          provinceName: selectedProvince,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('City created successfully!');
        setCityName('');
        setSelectedProvince('');
      } else {
        alert(`Error: ${data.message || 'Something went wrong!'}`);
      }
    } catch (error) {
      console.error('Error submitting city:', error);
      alert('Error submitting city!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-auto bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">City</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <select
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select a province</option>
          {provinces.map((province) => (
            <option key={province._id} value={province._id}>
              {province.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CityForm;