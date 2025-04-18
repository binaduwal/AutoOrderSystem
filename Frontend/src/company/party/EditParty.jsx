import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6"
import BASE_URL from '../../config'

const EditParty = ({ partyId, onUpdated, onClose }) => {
  const [formData, setFormData] = useState({
    partyName: "",
    email: "",
    contactNumber: "",
    contactPerson: "",
    taxNumber: "",
    provinceId: "",
    cityId: "",
    locationId: "",
    routeId: "",
    partyGroupId: "",
    vatPan: "vat",
    vatPanNo: "",
    status: false,
  })

  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [locations, setLocations] = useState([])
  const [routes, setRoutes] = useState([])
  const [partygroups, setPartyGroups] = useState([])

  useEffect(() => {
    const fetchPartyDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/party/${partyId}`)
        if (response.ok) {
          const { data } = await response.json()
          setFormData({
            partyName: data.partyName,
            email: data.email,
            contactNumber: data.contactNo,
            contactPerson: data.contactPerson,
            taxNumber: data.taxNumber || "",
            provinceId: data.provinceId ? data.provinceId._id : "",
            cityId: data.cityId ? data.cityId._id : "",
            locationId: data.locationId ? data.locationId._id : "",
            routeId: data.routeId ? data.routeId._id : "",
            partyGroupId: data.partyGroupId ? data.partyGroupId._id : "",
            vatPan: data.vatPan,
            vatPanNo: data.vatPanNo,
            status: data.status === "active",
          })
        } else {
          console.error("Failed to fetch party details")
        }
      } catch (error) {
        console.error("Error fetching party details:", error)
      }
    }
    if (partyId) {
      fetchPartyDetails()
    }
  }, [partyId])

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(`${BASE_URL}/province/all`)
        const data = await response.json()
        setProvinces(data)
      } catch (error) {
        console.error('Error fetching provinces:', error)
      }
    }
    fetchProvinces()
  }, [])

  useEffect(() => {
    const fetchCities = async () => {
      if (formData.provinceId) {
        try {
          const response = await fetch(`${BASE_URL}/city/province/${formData.provinceId}`)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          if (Array.isArray(data)) {
            setCities(data)
          } else {
            console.error('Invalid data format:', data)
            setCities([])
          }
        } catch (error) {
          console.error('Error fetching cities:', error)
        }
      }
    }
    fetchCities()
  }, [formData.provinceId])

  useEffect(() => {
    const fetchLocations = async () => {
      if (formData.cityId) {
        try {
          const response = await fetch(`${BASE_URL}/location/city/${formData.cityId}`)
          const data = await response.json()
          setLocations(Array.isArray(data) ? data : [])
        } catch (error) {
          console.error('Error fetching locations:', error)
          setLocations([])
        }
      } else {
        setLocations([])
      }
    }
    fetchLocations()
  }, [formData.cityId])

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/route/all`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setRoutes(data)
      } catch (error) {
        console.error("Error fetching routes:", error)
      }
    }
    fetchRoutes()
  }, [])

  useEffect(() => {
    const fetchPartyGroup = async () => {
      try {
        const response = await fetch(`${BASE_URL}/partygroup/all`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setPartyGroups(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching party groups:', error)
        setPartyGroups([])
      }
    }
    fetchPartyGroup()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updateData = {
      ...formData,
      contactNo: formData.contactNumber,
      status: formData.status ? "active" : "inactive"
    }

    const objectIdFields = ['provinceId', 'cityId', 'locationId', 'routeId', 'partyGroupId'];
    objectIdFields.forEach(field => {
      if (updateData[field] === '') {
        updateData[field] = undefined;
      }
    })

    console.log("Sending update request:", updateData)
    try {
      const response = await fetch(`${BASE_URL}/party/edit/${partyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })

      if (response.ok) {
        const { data } = await response.json()
        onUpdated(data)
        onClose()
      }
    } catch (error) {
      console.error('Error updating party:', error)
    }
  }

  return (
<div className="max-w-3xl mx-auto bg-white p-4 md:p-8 h-[90vh] overflow-y-auto my-auto">
<h2 className="text-lg md:text-xl font-medium mb-4 md:mb-6 flex items-center">
          Party <FaAngleRight className="mx-1"/> Edit Party
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        <div className="space-y-4">
        <h3 className="text-md md:text-lg font-medium text-gray-800">Party Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="flex flex-col">
              <label className="block text-gray-700 font-medium">Party Name</label>
              <input
                type="text"
                name="partyName"
                placeholder="Enter party name"
                className="w-full p-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.partyName}
                onChange={(e) =>
                  setFormData({ ...formData, partyName: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium">Contact Number</label>
              <input
                type="text"
                name="contactNo"
                placeholder="Enter contact number"
                className="w-full p-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full p-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium">Contact Person</label>
              <input
                type="text"
                name="contactPerson"
                placeholder="Enter contact person"
                className="w-full p-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.contactPerson}
                onChange={(e) =>
                  setFormData({ ...formData, contactPerson: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium">Province</label>
              <select
                name="provinceId"
                className="w-full p-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.provinceId}
                onChange={(e) =>
                  setFormData({ ...formData, provinceId: e.target.value, cityId: "" })
                }
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
                name="cityId"
                className="w-full p-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.cityId}
                onChange={(e) =>
                  setFormData({ ...formData, cityId: e.target.value })
                }
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

            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium">Address</label>
              <select
                name="locationId"
                className="w-full p-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.locationId}
                onChange={(e) =>
                  setFormData({ ...formData, locationId: e.target.value })
                }
              >
                <option value="">Select Address</option>
                {locations.map((location) => (
                  <option key={location._id} value={location._id}>
                    {location.address}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:flex gap-4 md:gap-6">
        <div className="flex flex-col w-full md:w-1/3">
        <label className="block text-gray-700 font-medium">Tax Type</label>
            <select
              name="vatPan"
              className="w-full p-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.vatPan}
              onChange={(e) =>
                setFormData({ ...formData, vatPan: e.target.value })
              }
            >
              <option value="vat">VAT</option>
              <option value="pan">PAN</option>
            </select>
          </div>

          <div className="flex flex-col w-4/10">
            <label className="block text-gray-700 font-medium invisible">Placeholder</label>
            <input
              type="text"
              name="vatPanNo"
              placeholder="Enter number"
              className="w-full p-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.vatPanNo}
              onChange={(e) =>
                setFormData({ ...formData, vatPanNo: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col w-full md:w-1/3">
            <label className="block text-gray-700 font-medium">Status</label>
            <select
              name="status"
              className="w-full p-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.status ? "active" : "inactive"}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value === "active" })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col">
            <label className="block text-gray-700 font-medium">Route</label>
            <select
              name="routeId"
              className="w-full p-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.routeId}
              onChange={(e) =>
                setFormData({ ...formData, routeId: e.target.value })
              }
            >
              <option value="">Select Route</option>
              {routes
              .filter(route => route.status === 'active')
              .map((route) => (
                <option key={route._id} value={route._id}>
                  {route.routename}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-medium">Party Group</label>
            <select
              name="partyGroupId"
              className="w-full p-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.partyGroupId}
              onChange={(e) =>
                setFormData({ ...formData, partyGroupId: e.target.value })
              }
            >
              <option value="">Select Party Group</option>
              {partygroups
                .filter(partygroup => partygroup.status === 'active') 
                .map((partygroup) => (
                <option key={partygroup._id} value={partygroup._id}>
                  {partygroup.partyGroupName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center sticky bottom-0 bg-white pt-4 pb-2">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Edit Party
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditParty
