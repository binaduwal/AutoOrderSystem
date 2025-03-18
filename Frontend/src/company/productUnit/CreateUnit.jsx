import React, { useState} from "react"

const CreateUnit = ({onCreated}) => {
  const [name, setName] = useState("")
  const [status, setStatus] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const unitData = {
      unitName: name,
      status: status ? "active" : "inactive",
    }

    try {
      const response = await fetch("http://localhost:5000/unit/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(unitData),
      })

      if (response.ok) {
        const newData = await response.json()
        console.log("Unit created:", newData)
        onCreated(newData.unit) 
            } else {
        const errorData = await response.json()
        console.log("Failed to create unit:", errorData)
      }
    } catch (error) {
      console.error("Error while creating unit", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Unit</h2>
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

        <div className=" mt-2 mb-4 flex items-center">
          <input
            type="checkbox"
            id="active_user"
            name="active_user"
            checked={status}
            onChange={() => setStatus(!status)}
            className="mr-2"
          />
          <label htmlFor="active_user" className="text-gray-700 font-medium">
            Active 
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateUnit