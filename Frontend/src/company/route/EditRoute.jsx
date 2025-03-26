import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";

const EditRoute = ({routeData,onUpdated,onClose}) => {
    const [formData,setFormData]=useState({
        name:routeData?.routename|"",
        status:routeData?.status==="active"
    })
    const routeId = routeData?._id;
    
    useEffect(()=>{
        if(routeId){
            const fetchDetails= async()=>{
                try {
    console.log("Fetching details:", routeId)
    const response = await fetch(`http://localhost:5000/route/${routeId}`)

    if(response.ok){
        const data=await response.json()
        console.log("Fetched data:",data)
        setFormData({
            name:data.routename||'',
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
    
    },[routeId])
    
 
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const payload={
            routename:formData.name,
            status:formData.status?'active':'inactive'
        }

        try {
            const response = await fetch(`http://localhost:5000/route/edit/${routeId}`, {
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
Payment Mode <FaAngleRight/>Edit Payment</h2>
<form onSubmit={handleSubmit}
>
    <div>
        <label className='text-gray-700 font-medium text-left'>Name</label>
        <input
        type='text'
        name='routename'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className='border border-gray-300 rounded-md text-left w-full p-1 mb-3'
        />
    </div>

    <div className='flex items-center mt-1 mb-3'>
        <input
        type='checkbox'
        name='active_payment'
        id='active_payment'
        checked={formData.status}
        onChange={() => setFormData({ ...formData, status: !formData.status })}
        className="mr-2"

        />
        <label htmlFor='active_payment' className='text-gray-700 font-medium pl-2'>Active</label>
    </div>

    <button
    type='submit'
    className='w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200'>Edit</button>
</form>
</div>
  )
}

export default EditRoute