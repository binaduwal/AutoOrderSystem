import {useState,useEffect } from "react"

export default function EditCity({ city, onClose, onUpdated }) {
const [cityName, setCity] = useState(city.name || "")
const [selectedProvince, setSelectedProvince] = useState(city?.province?._id || '')
const [provinces, setProvinces] = useState([])

useEffect(() => {
const fetchProvinces = async () => {
    try {
    const response = await fetch('http://localhost:5000/province/all')
    if (response.ok) {
        const data = await response.json()
        console.log('Fetched provinces:', data) 
        setProvinces(Array.isArray(data) ? data : data.provinces || [])
    } else {
        console.error('Failed to fetch provinces')
    }
    } catch (error) {
    console.error('Error fetching provinces:', error)
    }
}
    
fetchProvinces()
}, [])
    
const handleSubmit = async (e) => {
e.preventDefault()

const capitalizedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1)

console.log("Updating city with data:", { cityName, selectedProvince })

try {
    const response = await fetch(`http://localhost:5000/city/edit/${city._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: capitalizedCityName,
            provinceId: selectedProvince,
        }),
    })

    if (!response.ok) {
        const errorData = await response.json()
        console.error("Error response:", errorData)
        throw new Error("Failed to edit data")
    }

    const result = await response.json()
    console.log("City updated:", result)
    
    onUpdated(result) 
    onClose()
} catch (err) {
    console.error(err)
    alert("Failed to edit data")
}
}

return (
<div className="flex flex-col items-center justify-center min-h-auto bg-gray-100 p-4">
    <h2 className="text-2xl font-bold mb-4">Edit City</h2>
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
        onChange={(e) => setCity(e.target.value)}
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
)
  }
  