import { useState } from "react";

export default function ProvinceForm({ onClose, onCreated }) {
  const [province, setProvince] = useState("");

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const provinceName = capitalizeFirstLetter(province.trim());

    if (!provinceName) {
      alert("Province name is required!");
      return;
    }

    try {
      const checkResponse = await fetch(`http://localhost:5000/province/${provinceName}`);
      
      if (checkResponse.ok) {
        const data = await checkResponse.json();
        if (data.exists) {
          alert("Province already exists!");
          return;
        }
      }

      const response = await fetch("http://localhost:5000/province/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: provinceName }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Province saved successfully!");
        onCreated(data);
        onClose();
      } else {
        console.log("Failed to create data");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving province");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-auto bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Province Name</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <input
          type="text"
          placeholder="Enter province name"
          value={province}
          onChange={(e) => setProvince(e.target.value)}  
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
}
