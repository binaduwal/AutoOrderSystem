import React, { useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";


const CreatePayment = () => {
    const [name,setName]=useState("")
    const [status,setStatus]=useState(false)
    const handleSubmit=()=>{
        
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
        onChange={()=>{setName(e.target.value)}}
        className='border border-gray-300 rounded-md text-left w-full p-1 mb-3'
        />
    </div>

    <div className='flex items-center mt-1 mb-3'>
        <input
        type='checkbox'
        name='active_payment'
        id='active_payment'
        onChange={()=>setStatus(!status)}
        />
        <label htmlFor='active_payment' className='text-gray-700 font-medium pl-2'>Status</label>
    </div>

    <button
    type='submit'
    className='w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200'   >Create</button>
</form>
</div>
)
}

export default CreatePayment