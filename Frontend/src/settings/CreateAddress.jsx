import React, { useState ,useEffect} from "react"
import BASE_URL from '../config'

const CreateAddress = ({ onCreated }) => {
  const [formData, setFormData] = useState({
    province: "",
    city: "",
    address: "",
  })

  const [provinces,setProvinces]=useState([])
  const [cities, setCities] = useState([]) 

  useEffect(()=>{
    const fetchProvinces=async()=>{
      try {
        const response=await fetch(`${BASE_URL}/province/all`)
        const data= await response.json()
        setProvinces(data)
      } catch (error) {
        console.error('Error fetching provinces:', error)

      }
    }
    fetchProvinces()
  },[])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newLocation = {
      province: formData.province,
      city: formData.city,
      address: formData.address,
    }

    try {
      const response = await fetch(`${BASE_URL}/location/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLocation),
      })

      if (response.ok) {
        const createdAddress = await response.json()
        onCreated(createdAddress)
        setFormData({ province: "", city: "", address: "" })
      } else {
        console.log("Failed to create address")
      }
    } catch (error) {
      console.error("Error while creating address", error)
    }
  }


      useEffect(() => {
        const fetchCities = async () => {
          if (formData.province) { 
            try {
              const response = await fetch(`${BASE_URL}/city/province/${formData.province}`)
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
              }
              const data = await response.json()
              console.log('Fetched Cities:', data) 
              
              if (Array.isArray(data)) {
                setCities(data) 
              } else {
                console.error('Invalid data format:', data)
                setCities([]) 
              }
            } catch (error) {
              console.error('Error fetching cities:', error)
              setMessage("Failed to load cities. Please try again.")
            }
          }
        }
        fetchCities() 
      }, [formData.province])
  
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Address</h2>
      <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
              <label className="block text-gray-700 font-medium">Province</label>
              <select
                name="provinceId"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.province}
                onChange={(e) => setFormData({
                  ...formData, 
                  province: e.target.value,
                  city: ""
                })}
              
              >
                <option value="">Select Province</option>
                {provinces.map((province)=>(
                  <option key={province._id} value={province._id}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>



            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium">City</label>
              <select
                name="city"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.city}
                onChange={(e)=>setFormData({
                  ...formData,city:e.target.value
                })}
              
              >

                <option value="">Select City</option>
                {Array.isArray(cities) && cities.length > 0 ? ( 
                  cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))
                ) : (
                  <option value="">No cities available</option>
                )}
              </select>
            </div>

        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateAddress
