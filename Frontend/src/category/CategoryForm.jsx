import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const CategoryForm = ({ onClose,onCategoryCreated }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const companyId = localStorage.getItem("companyId")
    if (!companyId) {
      navigate("/login")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const companyId = localStorage.getItem("companyId")
    if (!companyId) {
      console.error("Company ID not found in localStorage")
      return
    }

    const categoryData = {
      category_name: name,
      description,
      status: status ? "active" : "inactive",
      companyId,
    }

    try {
      const response = await fetch("http://localhost:5000/category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      })

      if (response.ok) {
        const newData = await response.json()
        console.log("Category created:", newData)
        onClose()
        onCategoryCreated() 
            } else {
        const errorData = await response.json()
        console.log("Failed to create category:", errorData)
      }
    } catch (error) {
      console.error("Error while creating category", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-medium text-left">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="active_user"
            name="active_user"
            checked={status}
            onChange={() => setStatus(!status)}
            className="mr-2"
          />
          <label htmlFor="active_user" className="text-gray-700 font-medium">
            Active User
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
        >
          Create User
        </button>
      </form>
    </div>
  )
}

export default CategoryForm