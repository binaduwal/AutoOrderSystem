
import React, { useState, useEffect } from 'react'
import { FaAngleRight } from "react-icons/fa6"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from 'react-router-dom'

const CreateOrder = () => {
  const navigate = useNavigate()
  const [parties, setParties] = useState([])
  const [salesmen, setSalesmen] = useState([])
  const [paymentModes, setPaymentModes] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [orderItems, setOrderItems] = useState([{
    product: null,
    originalPrice: 0, 
    price: 0, 
    quantity: 1,
    discount: 0,
    maxDiscount: 0,
    vat: 0,
    rate: 0,
    amount: 0
  }])

  const [formData, setFormData] = useState({
    party: "",
    salesman: "",
    estimatedDeliveryDate: "",
    payment: "",
    remarks: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partiesRes, salesmenRes, paymentRes, productsRes] = await Promise.all([
          fetch('http://localhost:5000/party/all'),
          fetch('http://localhost:5000/salesperson/all'),
          fetch('http://localhost:5000/paymentmode/all'),
          fetch('http://localhost:5000/product/all')
        ])

        const partiesData = await partiesRes.json()
        const salesmenData = await salesmenRes.json()
        const paymentData = await paymentRes.json()
        const productsData = await productsRes.json()

        setParties(partiesData.data || [])
        setSalesmen(salesmenData || [])
        setPaymentModes(paymentData || [])
        setProducts(productsData.data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const addProductRow = () => {
    setOrderItems([...orderItems, {
      product: null,
      originalPrice: 0,
      price: 0,
      quantity: 1,
      discount: 0,
      maxDiscount: 0,
      vat: 0,
      rate: 0,
      amount: 0
    }])
  }

  const handleProductSelect = (index, productId) => {
    const selectedProduct = products.find(p => p._id === productId)
    const newItems = [...orderItems]
    
    newItems[index] = {
      ...newItems[index],
      product: selectedProduct,
      originalPrice: selectedProduct?.maxSellingPrice || 0,
      price: selectedProduct?.maxSellingPrice || 0,
      vat: selectedProduct?.vatable ? 13 : 0,
      maxDiscount: selectedProduct?.maxDiscount || 0,
      discount: 0
    }

    newItems[index] = calculateValues(newItems[index])
    setOrderItems(newItems)
  }

  const handleInputChange = (index, field, value) => {
    const newItems = [...orderItems]
    let numericValue = Number(value)
  
    if (field === 'discount') {
      numericValue = Math.min(Math.max(numericValue, 0), newItems[index].maxDiscount)
      newItems[index].discount = numericValue
    } else if (field === 'quantity') {
      newItems[index].quantity = numericValue
    }
  
    newItems[index] = calculateValues(newItems[index])
    setOrderItems(newItems)
  }

  const calculateValues = (item) => {
    const discountedPrice = item.originalPrice * ((100 - item.discount) / 100)
    
    let rate, amount, vatAmount
    if (item.product?.vatable) {
      rate = discountedPrice / (1 + 0.13)
      vatAmount = (discountedPrice - rate) * item.quantity
      amount = discountedPrice * item.quantity  
    } else {
      rate = discountedPrice
      vatAmount = 0
      amount = discountedPrice * item.quantity
    }
    return {
      ...item,
      price: Number(discountedPrice.toFixed(2)),
      rate: Number(rate.toFixed(2)),
      vat: Number(vatAmount.toFixed(2)),
      amount: Number(amount.toFixed(2))
    }
  }  

  const subtotal = orderItems.reduce((sum, item) => sum + (item.rate * item.quantity), 0)
const totalVat = orderItems.reduce((sum, item) => sum + item.vat, 0)
const grandTotal = orderItems.reduce((sum, item) => sum + item.amount, 0)


  const handleSubmit = async (e) => {
    e.preventDefault()
    const orderPayload = {
      orderNo: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString(),
      estimatedDeliveryDate: new Date(formData.estimatedDeliveryDate).toISOString(),
      partyID: formData.party,
      remarks: formData.remarks,
      salesmanID: formData.salesman,
      paymentModeID: formData.payment,
      grandTotal: grandTotal
    }

    const orderItemsPayload = orderItems.map(item => ({
      productId: item.product?._id,
      price: item.price,
      qty: item.quantity,
      discount: item.discount,
      vatAmount: item.vat,
      rate: item.rate,
      totalAmount: item.amount
    }))
    
    try {
      const response = await fetch('http://localhost:5000/order/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orderPayload,
          orderItems: orderItemsPayload
        })
      })
      const data = await response.json()
      if (response.ok) {
        navigate('/company/order', { state: { shouldRefresh: true } })
      } else {
        console.error('Error creating order:', data)
      }
    } catch (error) {
      console.error('Error submitting order:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading data...</div>
  }

  return (
    <div className="max-w-full mx-auto bg-white p-6">
      <div className='ml-18 mr-18'>
        <h2 className="text-lg font-medium mb-6 flex items-center">
          Orders <FaAngleRight className="mx-1"/> Create Order
        </h2>

        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          {/* Order Information */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-black-700">Order Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">Party</label>
                <select
                  className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={formData.party}
                  onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                  required
                >
                  <option value="">Select Party</option>
                  {parties
                  .filter(party => party.status === 'active') 
                  .map(party => (
                    <option key={party._id} value={party._id}>
                      {party.partyName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Salesman</label>
                <select
                  className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={formData.salesman}
                  onChange={(e) => setFormData({ ...formData, salesman: e.target.value })}
                  required
                >
                  <option value="">Select Salesman</option>
                  {salesmen
                  .filter(salesman=>salesman.status==='active')
                  .map(salesman => (
                    <option key={salesman._id} value={salesman._id}>
                      {salesman.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Delivery Date and Payment */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">Delivery Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={formData.estimatedDeliveryDate}
                  onChange={(e) => setFormData({ ...formData, estimatedDeliveryDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Payment</label>
                <select
                  className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={formData.payment}
                  onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                  required
                >
                  <option value="">Select Payment</option>
                  {paymentModes
                      .filter(payment => payment.status === 'active')
                  .map(payment => (
                    <option key={payment._id} value={payment._id}>
                      {payment.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <div>
              <label className="block text-gray-700 font-medium">Remarks</label>
              <textarea
                className="w-sm p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 h-20"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                placeholder="Enter order remarks"
              ></textarea>
            </div>
          </div>

          {/* Product Table */}
          <div className="max-w-full mx-auto mt-8 p-3 bg-white rounded-lg overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-8 gap-4 bg-gray-50 p-3 rounded-t-lg">
              <div className="text-sm font-medium">Product</div>
              {/* Display original price here */}
              <div className="text-sm font-medium">Price</div>
              <div className="text-sm font-medium">Quantity</div>
              <div className="text-sm font-medium">Discount (%)</div>
              <div className="text-sm font-medium">Rate</div>
              <div className="text-sm font-medium">VAT (Rs)</div>
              <div className="text-sm font-medium">Amount</div>
              <div className="text-sm font-medium">Action</div>
            </div>

            {orderItems.map((item, index) => (
              <div key={index} className="grid grid-cols-8 gap-4 items-center p-3">
                {/* Product Selection */}
                <div className="col-span-1">
                  <select
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                    value={item.product?._id || ''}
                    onChange={(e) => handleProductSelect(index, e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    {products.map(product => (
                      <option key={product._id} value={product._id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Column: Always shows the original price */}
                <div className="col-span-1">
                  <input
                    type="number"
                    className="w-full p-2 rounded-md"
                    value={item.originalPrice.toFixed(2)}
                    readOnly
                  />
                </div>

                {/* Quantity */}
                <div className="col-span-1">
                  <input
                    type="number"
                    className="w-full p-2 rounded-md"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                    min="1"
                    required
                  />
                </div>

                {/* Discount */}
                <div className="col-span-1">
                  <input
                    type="number"
                    className="w-full p-2 rounded-md"
                    value={item.discount}
                    onChange={(e) => handleInputChange(index, 'discount', e.target.value)}
                    max={item.maxDiscount}
                    min="0"
                    required
                  />
                  <small className="text-gray-500 text-xs">Max: {item.maxDiscount}%</small>
                </div>

                {/* Rate */}
                <div className="col-span-1">
                  <input
                    type="number"
                    className="w-full p-2 rounded-md"
                    value={item.rate.toFixed(2)}
                    readOnly
                  />
                </div>

                {/* VAT */}
                <div className="col-span-1">
                  <input
                    type="number"
                    className="w-full p-2 rounded-md"
                    value={item.vat.toFixed(2)}
                    readOnly
                  />
                </div>

                {/* Amount */}
                <div className="col-span-1">
                  <input
                    type="number"
                    className="w-full p-2 rounded-md"
                    value={item.amount.toFixed(2)}
                    readOnly
                  />
                </div>

                {/* Delete Button */}
                <div className="col-span-1">
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => setOrderItems(orderItems.filter((_, i) => i !== index))}
                    disabled={orderItems.length === 1}
                  >
                    <RiDeleteBin6Line/>
                  </button>
                </div>
              </div>
            ))}
            </div>

            {/* Add Product Button */}
            <div className="mt-4">
              <button
                type="button"
                className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 text-sm"
                onClick={addProductRow}
              >
                + Add Product
              </button>
            </div>

            {/* Totals */}
            <div className="mt-5 space-y-1 text-right ">
              <div className="text-lg font-semibold">
                Sub Total: <span className="ml-4">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="text-lg font-bold">
                Grand Total: <span className="ml-4">Rs. {grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-left mt-6">
            <button
              type="submit"
              className="w-full md:w-auto bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg"
            >
              Place New Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateOrder
