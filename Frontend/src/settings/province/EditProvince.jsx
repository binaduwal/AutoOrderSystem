import { useState } from "react";


export default function EditProvince({ province, onClose, onUpdated }) {
    const [provinceName, setProvince] = useState(province.name || "");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const updatedData = {
        name: provinceName,
        id: province._id
      };
  
      try {
        const response = await fetch(`http://localhost:5000/province/edit/${province._id}`, {
            method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });
  
        if (response.ok) {
          const data = await response.json();
          alert("Province saved successfully!");
          onUpdated(data);
          onClose();
        } else {
          console.log("Failed to edit data");
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
            value={provinceName}
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
  