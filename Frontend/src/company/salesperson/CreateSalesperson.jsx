import React, { useState } from 'react'
import { FaAngleRight } from "react-icons/fa6"

const CreateSalesperson
 = ({onCreated}) => {
    const [name,setName]=useState("")
        const [status,setStatus]=useState(true)
        const [error, setError] = useState("")
        
        const handleSubmit= async (e)=>{
            e.preventDefault()
                const salespersonData={
                    name:name,
                    status:status?"active":"inactive"
                }
          
            try {
                const response=await fetch("http://localhost:5000/salesperson/create",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify(salespersonData)
                })
    
                if(response.ok){
                    const newData=await response.json()
                    console.log("SalesPerson  created:",newData)
                    onCreated(newData.salesperson)
                    setError("")
                }
    
                else{
                    const errorData=await response.json()
                    console.log("Failed to create data",errorData)
                    setError(errorData.error || "Failed to create data.")
                }

            } catch (error) {
                console.error("Error while creating unit", error)
                setError("Error while creating Salesperson. Please try again later.")
            }

        }
  return (
<div className='max-w-2xl mx-auto p-6 bg-white rounded-lg'>
<h2 className='text-md font-semibold flex items-center mb-6'>
Salesperson<FaAngleRight/>Create Salesperson</h2>
<form onSubmit={handleSubmit}
>
    <div>
        <label className='text-gray-700 font-medium text-left'>Name</label>
        <input
        type='text'
        name='name'
        value={name}
        onChange={(e)=>{setName(e.target.value)
            setError("")
        }}
        
        className='border border-gray-300 rounded-md text-left w-full p-1 mb-3'
        />
        {error && (
            <span className="text-red-500 text-sm mt-1 block">
              {error}
            </span>
          )}
    </div>

    <div className='flex items-center mt-1 mb-3'>
        <input
        type='checkbox'
        name='active_status'
        id='active_status'
        onChange={(e)=>setStatus(!status)}
        />
        <label htmlFor='active_status' className='text-gray-700 font-medium pl-2'>Status</label>
    </div>

    <button
    type='submit'
    className='w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200'   >Create</button>
</form>
</div>
  )
}

export default CreateSalesperson
