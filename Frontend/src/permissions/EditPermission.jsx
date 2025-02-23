import React,{useState} from 'react'

const EditPermission = ( {permission, onClose, onPermissionUpdated}) => {
    const [name,setName]=useState('')
    const [displayName,setDisplayName]=useState('')
    const [description, setDescription] = useState('')

  const handleDisplayNameChange=(e)=>
  {
    const updatedDisplayName=e.target.value
    setDisplayName(updatedDisplayName)

    const updatedName=updatedDisplayName.replace(/\s+/g,'-').toLowerCase()
    setName(updatedName)
  }

    const handleSubmit = async (e) => {
      e.preventDefault()
  
      const updatedPermission = {
        ...permission,
        name,
        display_name: displayName,
        description,
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
      } else {
        console.error('Failed to update permission')
      }
    } catch (error) {
      console.error('Error updating permission:', error)
    }

    onClose()
  }
  
  return (
    <div className="w-[400px] mx-auto p-6 bg-gradient-to-r from-indigo-50 to-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-semibold text-center text-indigo-600 mb-6">Permission Management</h1>
      <p className="text-center text-lg text-gray-600 mb-6">Edit the form with the required information to update the permission.</p>
      <h2 className="text-xl font-medium text-left mb-6 text-indigo-700">Edit Permission</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block font-medium text-left text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium text-left text-gray-700">Display Name</label>
          <input
            type="text"
            name="display_name"
            value={displayName}
            onChange={handleDisplayNameChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium text-left text-gray-700">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
