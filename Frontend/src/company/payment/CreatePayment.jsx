import React, { useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";


const CreatePayment = ({OnCreated}) => {
    const [name,setName]=useState("")
    const [status,setStatus]=useState(true)
    const [error, setError] = useState("")


    const handleSubmit= async (e)=>{
        e.preventDefault()
        setError("")

            const paymentData={
                name,
                status:status?"active":"inactive"
            }
      
        try {
            const response=await fetch("http://localhost:5000/paymentmode/create",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(paymentData)
            })

            if(response.ok){
                const newData=await response.json()
                console.log("Payment created:",newData)
                OnCreated(newData.paymentmode)
            }

            else{
                const errorData=await response.json()
                console.log("Failed to create data",errorData)
                setError(errorData.message || "Failed to create. It may already exist.")

            }
        } catch (error) {
            console.error("Error while creating unit", error)
        }
    }
  return (
<div className='max-w-2xl mx-auto p-6 bg-white rounded-lg'>
<h2 className='text-md font-semibold flex items-center mb-6'>
Payment Mode <FaAngleRight/>Create Payment</h2>
<form onSubmit={handleSubmit}
>
    <div>
        <label className='text-gray-700 font-medium text-left'>Name</label>
        <input
        type='text'
        name='name'
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
        className='border border-gray-300 rounded-md text-left w-full p-1 mb-3'
        />
    </div>

    <div className='flex items-center mt-1 mb-3'>
        <input
        type='checkbox'
        name='active_payment'
        id='active_payment'
        onChange={(e)=>setStatus(!status)}
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
    className='w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200'   >Create</button>
</form>
</div>
)
}

export default CreatePayment