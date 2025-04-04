import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6"
import BASE_URL from '../../config'

const EditPayment = ({paymentData,onUpdated,onClose}) => {
    const [formData,setFormData]=useState({
        name:paymentData?.name||"",
        status:paymentData?.status==="active"
    })
      const [error, setError] = useState("")
    
    const paymentId = paymentData?._id
    

    useEffect(() => {
        if (paymentId) {
          const fetchDetails = async () => {
            try {
              console.log("Fetching details:", paymentId)
              const response = await fetch(`${BASE_URL}/paymentmode/${paymentId}`)
      
              if (response.ok) {
                const data = await response.json()
                console.log("Fetched data:", data)
                setFormData({
                  name: data.name || '',
                  status: data.status === 'active',
                })
              } else {
                alert('Failed to fetch details.')
              }
            } catch (error) {
              console.error('Error fetching data:', error)
            }
          }
          fetchDetails()
        } else {
          console.error('Invalid paymentId')
        }
      }, [paymentId])
          
 
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setError("")
        const payload={
            name:formData.name,
            status:formData.status?'active':'inactive'
        }

        try {
            const response = await fetch(`${BASE_URL}/paymentmode/edit/${paymentId}`, {
            method:'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
            })

            if(response.ok){
                const data=await response.json()
                console.log(data)
                if(onUpdated){
                    onUpdated(data.updated)
                }
                if(onClose){
                    onClose()
                }
            }
            else{
              const errorData=await response.json()
              console.log("Failed to create data",errorData)
              setError(errorData.message || "Failed to create. It may already exist.")

       
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
        name='name'
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
        <label htmlFor='active_payment' className='text-gray-700 font-medium pl-2'>Status</label>
    </div>

    {error && (
          <div className="mb-3 text-red-600">
            {error}
          </div>
        )}

    <button
    type='submit'
    className='w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200'>Edit</button>
</form>
</div>
  )
}

export default EditPayment