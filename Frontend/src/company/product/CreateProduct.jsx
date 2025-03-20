import React, { useEffect, useState} from "react"

const CreateProduct = ({onCreated,onClose}) => {
const [units,setUnits]=useState([])
const [selectedUnit, setSelectedUnit] = useState("") 


  const [formData, setFormData] = useState({
    name: "",
    productCode: "",
    vatable:true,
    productImage: "",
    maxSellingPrice: 0,
    maxDiscount:0,
    status: false
  });


const fetchUnits=async()=>{
  try{
    const response=await fetch('http://localhost:5000/unit/all')
    const data=await response.json()
    if (Array.isArray(data)){
      setUnits(data)
    }
    else {
      console.error("Unexpected response format:", data)
      setUnits([])
    }
    }
    catch(error)
    {
    console.error("Error fetching data:",error)
    }
}
useEffect(()=>{
  fetchUnits()
},[])

const handleSubmit=async(e)=>{
e.preventDefault()
const updatedData = {
  ...formData,
  productUnitId: selectedUnit,
  status: formData.status === "Active" ? "active" : "inactive"
}

try{
  const response=await fetch("http://localhost:5000/product/create",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  })
  if(response.ok)
  {
    const newData = await response.json()
    console.log("Created")
    onCreated(newData)
    onClose()
  }
  const result=await response.json()
  if (response.ok) {
  setFormData({
    name: "",
    productCode: "",
    vatable: true,
    productImage: "",
    maxSellingPrice: "",
    maxDiscount: "",
    status: false,
  })
}
else {
  console.error("Error Response:", result);
}
}
catch (error) {
}
}


const handleChange=(e)=>{
  const {name,value}=e.target
  setFormData({
    ...formData,
    [name]: name === "vatable" ? value === "true" : value  })
}

const handleUnitChange = (e) => {
  setSelectedUnit(e.target.value)
}
return (
    <div className="max-h-auto w-full mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <div className="overflow-y-auto max-h-[500px]">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Enter Product Name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="productCode">
            Product Code
          </label>
          <input
            type="text"
            name="productCode"
            onChange={handleChange}
            value={formData.productCode}
            placeholder="Enter Product Code"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="maxSellingPrice">
            Selling Price
          </label>
          <input
            type="number"
            onChange={handleChange}
            name="maxSellingPrice"
            value={formData.maxSellingPrice}
            placeholder="Enter Selling Price"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="maxDiscount">
            Max Discount Allowed
          </label>
          <input
            type="number"
            name="maxDiscount"
            onChange={handleChange}
            value={formData.maxDiscount}
            placeholder="Enter Discount (Max 10%)"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="vatable">
            VAT
          </label>
          <div className="flex items-center">
          </div>
          <select 
          name="vatable" 
            value={formData.vatable}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select</option>
            <option value="true">True</option>
            <option value="false">False</option>
            
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="unit">
            Unit
          </label>
          <select
            name="unit"
            value={selectedUnit}
            onChange={handleUnitChange}
            className="w-full px-3 py-2 border text-black-800 border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select Unit</option>
            {units
            .filter((unit)=>unit.status==="active")
            .map((unit)=>(
              <option key={unit._id} value={unit._id}>
                  {unit.unitName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="categoryId">
            Category
          </label>
          <select
          name="categoryId"
          value={formData.categoryId || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          >
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="status">
            Status
          </label>
          <select
          name="status"
            onChange={handleChange}
            value={formData.status}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>


<div className="col-span-full">
      <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">Image</label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
          </svg>
          <div className="mt-4 flex text-sm/6 text-gray-600">
            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
              <span>Upload a file</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div> 


        <button
          type="submit"
          className="px-2 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Create
        </button>
      </form>
    </div>
    </div>
  )
}

export default CreateProduct
