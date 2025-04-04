import React, { useState, useEffect } from "react"

const CreateRole = ({onRoleCreated }) => {
  const [name, setName] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [description, setDescription] = useState("")
  const [permissions, setPermissions] = useState([])
  const [selectedPermissions, setSelectedPermissions] = useState([])

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch("http://localhost:5000/permission/all")
        if (response.ok) {
          const data = await response.json()
          setPermissions(data)
        }
      } catch (error) {
        console.error("Error fetching permissions:", error)
      }
    }
    fetchPermissions()
  }, [])

  const handleCheckboxChange = (permissionId) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    )
  }

  const handleDisplayNameChange = (e) => {
    const updatedDisplayName = e.target.value
    setDisplayName(updatedDisplayName)
    setName(updatedDisplayName.replace(/\s+/g, "-").toLowerCase())
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const roleData = {
      name,
      display_name: displayName,
      description,
      permissions: selectedPermissions
    }
    
    try {
      const response = await fetch("http://localhost:5000/role/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roleData),
      })

      if (response.ok) {
        const newRole=await response.json()
        console.log("Roles Created",newRole)
        onRoleCreated(newRole)
      }
      else{
        console.log("Failed to create role")
      }
    } catch (error) {
      console.error("Error creating role:", error)
    }
  }

  return (
    <div className="p-4 bg-white">
      <h1 className="text-xl font-semibold text-indigo-600 mb-4">
        Create New Role
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
            onChange={(e) => setName(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded-md focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={handleDisplayNameChange}
            required
            className="w-full p-1 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Permissions</label>
          <div className="grid grid-cols-4 gap-4 mt-2">
            {permissions.map((permission) => (
              <label key={permission._id} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(permission._id)}
                  onChange={() => handleCheckboxChange(permission._id)}
                  className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
 <span className="ml-2">{permission.display_name}</span>
                       </label>
            ))}
          </div>
        </div>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Create Role
          </button>
      </form>
    </div>
  )
}

export default CreateRole