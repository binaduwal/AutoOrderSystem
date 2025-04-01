import React, { useState, useEffect } from 'react'

const EditUnit = ({unitData,onUpdated,onClose}) => {
const [formData, setFormData] = useState({
    name: unitData?.unitName || "",
    status: unitData?.status === "active" })

const unitId = unitData?._id;


useEffect(()=>{
    if(unitId){
    const fetchDetails=async()=>{
        try{
        console.log("Fetching details for unitId:", unitId)
        const response = await fetch(`http://localhost:5000/unit/${unitId}`)
        if(response.ok)
        {
        const data=await response.json()
        console.log("Fetched data:", data)
        setFormData({
        name:data.unitName || '',
        status:data.status==='active'
         })
        }
        else {
            alert('Failed to fetch  details.')
          }
        } 
        catch (error) {
          console.error('Error fetching data:', error)
        }
        } 
        fetchDetails()
    }
},[unitId])

const handleSubmit=async(e)=>{
    e.preventDefault()
    const payload={
        unitName:formData.name,
        status:formData.status?'active':'inactive'
    }

try{
    const response = await fetch(`http://localhost:5000/unit/edit/${unitId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (response.ok){
        const data=await response.json()
        console.log(data)
        if(onUpdated){
            onUpdated(data)
        }

        if(onClose)
        {
            onClose()
        }
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
        <div className="max-w-xl mx-auto p-6 bg-white">
          <h2 className="text-2xl font-bold mb-6">Edit Unit</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium text-left">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500"
              />
            </div>
    
            <div className=" mt-2 mb-4 flex items-center">
              <input
                type="checkbox"
                id="active_user"
                name="active_user"
                checked={formData.status}
                onChange={() => setFormData({ ...formData, status: !formData.status })}
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
              Edit
            </button>
          </form>
        </div>
      )
    }

export default EditUnit