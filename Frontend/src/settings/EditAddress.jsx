import React, { useState, useEffect } from "react"

const EditAddress = ({ entityData, onUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    province: "",
    city: "",
    address: "",
  })

  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("http://localhost:5000/province/all")
        const data = await response.json()
        setProvinces(data)
      } catch (error) {
        console.error("Error fetching provinces:", error)
      }
    }
    fetchProvinces()
  }, [])

  useEffect(() => {
    if (entityData) {
      setFormData({
        province: entityData.province?._id || "",
        city: entityData.city?._id || "",
        address: entityData.address || "",
      })
      setLoading(false)
    }
  }, [entityData])

  useEffect(() => {
    const fetchCities = async () => {
      if (formData.province) {
        try {
          const response = await fetch(
            `http://localhost:5000/city/province/${formData.province}`
          )
          const data = await response.json()
          setCities(data)
        } catch (error) {
          console.error("Error fetching cities:", error)
        }
      }
    }
    fetchCities()
  }, [formData.province])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `http://localhost:5000/location/${entityData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      )

      if (response.ok) {
        const updatedAddress = await response.json()
        onUpdated(updatedAddress)
        onCancel()
      } else {
        console.log("Failed to update address")
      }
    } catch (error) {
      console.error("Error while updating address", error)
    }
  }

  if (loading) return <div className="text-center p-4">Loading...</div>

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700 font-medium mb-2">Province</label>
          <select
            value={formData.province}
            onChange={(e) => setFormData({ ...formData, province: e.target.value, city: "" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province._id} value={province._id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-4">
          <label className="block text-gray-700 font-medium mb-2">City</label>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className=" w-full px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Update Address
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditAddress