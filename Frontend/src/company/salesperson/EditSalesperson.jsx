import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6"
import BASE_URL from '../../config'

const EditSalesperson
= ({entityData,onUpdated,onClose}) => {
    const [formData,setFormData]=useState({
        name:entityData?.name||"",
        status:entityData?.status==="active"
        
    })
    
    const salespersonId = entityData?._id
    
    useEffect(()=>{
        if(salespersonId){
            const fetchDetails= async()=>{
                try {
    console.log("Fetching details:", salespersonId)
    const response = await fetch(`${BASE_URL}/salesperson/${salespersonId}`)

    if(response.ok){
        const data=await response.json()
        console.log("Fetched data:",data)
        setFormData({
            name:data.name||'',
            status:data.status==='active'
        })
    }
    else {
        alert('Failed to fetch  details.')
      }
    
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            }
            fetchDetails()
        }
    
    },[salespersonId])
    
 
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const payload={
            name:formData.name,
            status:formData.status?'active':'inactive'
        }

        try {
            const response = await fetch(`${BASE_URL}/salesperson/edit/${salespersonId}`, {
            method:'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
            })

            if(response.ok){
                const data=await response.json()
                console.log(data)
                if(onUpdated){
                    onUpdated(data)
                }
                if(onClose){
                    onClose()
                }
            }
            else{
            console.error('Failed to update data')
       
            }
            } catch (error) {
            console.error('Error updating data:', error)
            }
    }
    
    
    

  return (
<div className='max-w-2xl mx-auto p-6 bg-white rounded-lg'>
<h2 className='text-md font-semibold flex items-center mb-6'>
Salesperson <FaAngleRight/>Edit Salesperson</h2>
<form onSubmit={handleSubmit}
>
    <div>
        <label className='text-gray-700 font-medium text-left'>Name</label>
        <input
        type='text'
        name='name'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className='border border-gray-300 rounded-md text-left w-full p-1 mb-3'
        />
    </div>

    <div className='flex items-center mt-1 mb-3'>
        <input
        type='checkbox'
        name='active_salesperson'
        id='active_salesperson'
        checked={formData.status}
        onChange={() => setFormData({ ...formData, status: !formData.status })}
        className="mr-2"

        />
        <label htmlFor='active_salesperson' className='text-gray-700 font-medium pl-2'>Active</label>
    </div>

    <button
    type='submit'
    className='w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200'>Edit</button>
</form>
</div>
  )
}

export default EditSalesperson

