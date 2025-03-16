import React, { useState } from "react"
import { PlusIcon, XMarkIcon, TrashIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

const NestedCategory = () => {
  const [nodes, setNodes] = useState([])
  const [modalParentId, setModalParentId] = useState(null)
  const [expandedNodes, setExpandedNodes] = useState({})
  const [formData, setFormData] = useState({ name: "", description: "", status: "active" })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleExpand = (id) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const addNode = (parentId = null) => {
    if (!formData.name.trim()) {
      alert("Please enter a name.")
      return
    }
    const newNode = {
      id: Date.now(),
      parentId,
      ...formData,
      children: [],
    }

    const updateStructure = (nodes) =>
      nodes.map((node) => {
        if (node.id === parentId) {
          return { ...node, children: [...node.children, newNode] }
        }
        return { ...node, children: updateStructure(node.children) }
      })

    setNodes((prev) => (parentId === null ? [...prev, newNode] : updateStructure(prev)))
    setModalParentId(null)
    setFormData({ name: "", description: "", status: "active" })
  }

  const removeNode = (id) => {
    const filterNodes = (nodes) =>
      nodes
        .filter((node) => node.id !== id)
        .map((node) => ({ ...node, children: filterNodes(node.children) }))
    setNodes(filterNodes(nodes))
  }

  const renderNodes = (nodes, depth = 0) => {
    return nodes.map((node) => (
      <>
        <tr key={node.id} className="border-b border-gray-200">
          <td className="py-2 px-4 flex items-center space-x-2">
            {node.children.length > 0 && (
              <button onClick={() => toggleExpand(node.id)} className="text-gray-600">
                {expandedNodes[node.id] ? <ChevronDownIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
              </button>
            )}
            <span className="font-semibold" style={{ marginLeft: depth * 20 }}>{node.name}</span>
          </td>
          <td className="py-2 px-4 text-gray-500 text-sm">{node.description}</td>
          <td className="py-2 px-4">
            <span className={`text-xs px-2 py-1 rounded ${node.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>{node.status}</span>
          </td>
          <td className="py-2 px-4 flex space-x-2">
            <button onClick={() => setModalParentId(node.id)} className="text-blue-600 hover:text-blue-800">
              <PlusIcon className="w-5 h-5" />
            </button>
            <button onClick={() => removeNode(node.id)} className="text-red-600 hover:text-red-800">
              <TrashIcon className="w-5 h-5" />
            </button>
          </td>
        </tr>
        {expandedNodes[node.id] && renderNodes(node.children, depth + 1)}
      </>
    ))
  }

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen overflow-y-auto bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <button onClick={() => setModalParentId("new")} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center space-x-2">
        <PlusIcon className="w-5 h-5" /> <span>Add Category</span>
      </button>
      <div className="mt-4 p-1 rounded">
        {nodes.length === 0 ? (
          <p className="text-center text-gray-500 py-4">There are no categories.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>{renderNodes(nodes)}</tbody>
          </table>
        )}
      </div>
      {modalParentId !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setModalParentId(null)}></div>
          <div className="bg-white p-6 rounded shadow-lg z-10 w-11/12 max-w-md">
            <h3 className="text-xl font-semibold mb-4">{modalParentId === "new" ? "Add Category" : "Add Subcategory"}</h3>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-500" />
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-500" />
            <select name="status" value={formData.status} onChange={handleInputChange} className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-500">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setModalParentId(null)} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-200 flex items-center">
                <XMarkIcon className="w-5 h-5 mr-1" /> Cancel
              </button>
              <button onClick={() => addNode(modalParentId === "new" ? null : modalParentId)} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NestedCategory
