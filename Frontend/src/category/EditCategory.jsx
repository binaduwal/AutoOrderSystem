import React, { useEffect, useState } from 'react'

const EditCategory = ({ category, onClose, onUpdated }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('active')

  useEffect(() => {
    if (category) {
      setName(category.category_name)
      setDescription(category.description)
      setStatus(category.status)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:5000/category/edit/${category._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_name: name,
          description,
          status
        }),
      })
      if (!response.ok) throw new Error("Failed to update")
      const data = await response.json()
      onUpdated(data.category)
      onClose() 
    } catch (error) {
      console.error("Error updating:", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium text-left mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium text-left mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="active_status"
            checked={status === 'active'}
            onChange={(e) => setStatus(e.target.checked ? 'active' : 'inactive')}
            className="mr-2"
          />
          <label htmlFor="active_status" className="text-gray-700">
            Active
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Update Category
        </button>
      </form>
    </div>
  )
}

export default EditCategory