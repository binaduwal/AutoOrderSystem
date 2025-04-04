import React, { useEffect, useState } from 'react'

const EditPermission = ( { DataId,permission, onClose, onPermissionUpdated}) => {

const [formData, setFormData] = useState({
  name: "",
  display_name: "",
  description: "",
})


const handleDisplayNameChange = (e) => {
  const updatedDisplayName = e.target.value
  setFormData((prev) => ({
    ...prev,
    display_name: updatedDisplayName,
    name: updatedDisplayName.replace(/\s+/g, '-').toLowerCase()
  }))
}

useEffect(() => {
  const fetchDetails = async () => {
    if (!DataId)
       return
    try {
      const response = await fetch(`http://localhost:5000/permission/${DataId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch permission details")
      }
      const data = await response.json()
      
      if (data) {
        setFormData({
          name: data.name || "",
          display_name: data.display_name || "",
          description: data.description || "",
        })
      }
    } catch (error) {
      console.error("Error fetching permission details:", error)
    }
  }

  fetchDetails()
}, [DataId])

    const handleSubmit = async (e) => {
      e.preventDefault()
  
      const updatedPermission = {
        ...permission,
        name:formData.name,
        display_name: formData.display_name,
        description:formData.description,
      }
    try {
      const response = await fetch(`http://localhost:5000/permission/edit/${permission._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPermission),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        onPermissionUpdated(data)
        onClose()
      }
       else {
        console.error('Failed to update permission')
      }
    }
     catch (error) {
      console.error('Error updating permission:', error)
    }

 }
  
  return (
    <div className="w-[400px] mx-auto">
      <h1 className="text-xl font-semibold text-center text-indigo-600 mb-6">Permission Management</h1>
      <p className="text-center text-lg text-gray-600 mb-6">Edit the form with the required information to update the permission.</p>
      <h2 className="text-xl font-medium text-left mb-6 text-indigo-700">Edit Permission</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block font-medium text-left text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium text-left text-gray-700">Display Name</label>
          <input
            type="text"
            name="display_name"
            value={formData.display_name}
            onChange={handleDisplayNameChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium text-left text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Update Permission
        </button>
      </form>
    </div>
  )
}

export default EditPermission
