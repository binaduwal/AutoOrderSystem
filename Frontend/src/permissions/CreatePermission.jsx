import React, { useState } from "react"

const CreatePermission = ({ onClose, onPermissionCreated }) => {
  const [name, setName] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [description, setDescription] = useState("")

  const handleDisplayNameChange = (e) => {
    const updatedDisplayName = e.target.value
    setDisplayName(updatedDisplayName)
    setName(updatedDisplayName.replace(/\s+/g, "-").toLowerCase())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const permissionData = {
      name,
      display_name: displayName,
      description,
    }

    try {
      const response = await fetch("http://localhost:5000/permission/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(permissionData),
      })

      if (response.ok) {
        const newPermission = await response.json()
        console.log("Permission created:", newPermission)
        // Update parent's permission list
        onPermissionCreated(newPermission)
      } else {
        console.log("Failed to create permission")
      }
    } catch (error) {
      console.error("Error while creating permission", error)
    }
  }

  return (
    <div className="p-7 bg-white shadow-lg rounded-lg w-full max-w-md ">
      <h1 className="text-xl font-semibold text-left text-indigo-600 mb-4">
        Create New Permission
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium text-left">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-left">
            Display Name
          </label>
          <input
            type="text"
            name="display_name"
            value={displayName}
            onChange={handleDisplayNameChange}
            required
            placeholder="Readable name for permission"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-left">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-200"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Create Permission
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePermission
