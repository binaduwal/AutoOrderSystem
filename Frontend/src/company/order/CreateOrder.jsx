import React, { useState, useEffect } from 'react'
import { FaAngleRight } from "react-icons/fa6"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from 'react-router-dom'

const CreateOrder = () => {
  const [parties, setParties] = useState([])
  const [salesmen, setSalesmen] = useState([])
  const [paymentModes, setPaymentModes] = useState([])
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  
  const [orderItems, setOrderItems] = useState([{
    product: null,
    price: 0,
    quantity: 1,
    discount: 0,
    maxDiscount: 0,
    vat: 0,
    rate: 0,
    amount: 0
  }])

  const [party, setParty] = useState("")
  const [salesman, setSalesman] = useState("")
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("")
  const [payment, setPayment] = useState("")
  const [remarks, setRemarks] = useState("")

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
      }
    }
    fetchData()
  }, [])

  const addProductRow = () => {
    setOrderItems([...orderItems, {
      product: null,
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
      numericValue = Math.min(numericValue, newItems[index].maxDiscount)
    }

    newItems[index][field] = numericValue
    newItems[index] = calculateValues(newItems[index])
    setOrderItems(newItems)
  }

  const calculateValues = (item) => {
    const rate = item.price * (1 - (item.discount / 100))
    const amount = rate * item.quantity
    const vatAmount = item.vat ? (amount * 0.13) : 0
    return {
      ...item,
      rate: Number(rate.toFixed(2)),
      amount: Number(amount.toFixed(2)),
      vat: Number(vatAmount.toFixed(2))
    }
  }

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.amount, 0)
  const totalVat = orderItems.reduce((sum, item) => sum + item.vat, 0)
  const grandTotal = subtotal + totalVat

  const handleSubmit = async (e) => {
    e.preventDefault()
    const orderPayload = {
      orderNo: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString(),
      estimatedDeliveryDate: new Date(estimatedDeliveryDate).toISOString(),
      partyID: party,
      remarks: remarks,
      salesmanID: salesman,
      paymentModeID: payment,
      orderItems: orderItems,
      grandTotal: grandTotal  // <-- Include grand total here
    }

    try {
      const response = await fetch('http://localhost:5000/order/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      })
      
      const data = await response.json()
      if (response.ok) {
        console.log('Order created successfully:', data)
        navigate('/company/order', { 
          state: { shouldRefresh: true } 
        })
      } else {
        console.error('Error creating order:', data)
      }
    } catch (error) {
      console.error('Error submitting order:', error)
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-medium mb-6 flex items-center">
        Orders <FaAngleRight className="mx-1"/> Create Order
      </h2>

      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        {/* Order Info Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-black-700">Order Info</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Party</label>
              <select
                name="party"
                className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={party}
                onChange={(e) => setParty(e.target.value)}
                required
              >
                <option value="">Select Party</option>
                {parties.map(party => (
                  <option key={party._id} value={party._id}>
                    {party.partyName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Salesman</label>
              <select
                name="salesman"
                className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={salesman}
                onChange={(e) => setSalesman(e.target.value)}
                required
              >
                <option value="">Select Salesman</option>
                {salesmen.map(salesman => (
                  <option key={salesman._id} value={salesman._id}>
                    {salesman.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Delivery & Payment Section */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Estimated Delivery Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={estimatedDeliveryDate}
                onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Payment</label>
              <select
                name="payment"
                className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                required
              >
                <option value="">Select Payment</option>
                {paymentModes.map(payment => (
                  <option key={payment._id} value={payment._id}>
                    {payment.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <label className="block text-gray-700 font-medium">Remarks</label>
            <textarea
              name="remarks"
              placeholder="Enter order remarks"
              className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 h-20"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Product Table Section */}
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-8 gap-4 bg-gray-50 p-3 rounded-t-lg border-b">
            <div className="text-sm font-medium">Product</div>
            <div className="text-sm font-medium">Price</div>
            <div className="text-sm font-medium">Quantity</div>
            <div className="text-sm font-medium">Discount (%)</div>
            <div className="text-sm font-medium">Rate</div>
            <div className="text-sm font-medium">VAT (Rs)</div>
            <div className="text-sm font-medium">Amount</div>
            <div className="text-sm font-medium">Action</div>
          </div>

          {orderItems.map((item, index) => (
            <div key={`item-${index}`} className="grid grid-cols-8 gap-4 items-center p-3 border-b">
              <div className="col-span-1">
                <select
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={item.product?._id || ''}
                  onChange={(e) => handleProductSelect(index, e.target.value)}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1">
                <input
                  type="number"
                  className="w-full p-2 rounded-md"
                  value={item.price}
                  readOnly
                  step="0.01"
                />
              </div>

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

              <div className="col-span-1">
                <input
                  type="number"
                  className="w-full p-2 rounded-md"
                  value={item.rate.toFixed(2)}
                  readOnly
                />
              </div>

              <div className="col-span-1">
                <input
                  type="number"
                  className="w-full p-2 rounded-md"
                  value={item.vat.toFixed(2)}
                  readOnly
                />
              </div>

              <div className="col-span-1">
                <input
                  type="number"
                  className="w-full p-2 rounded-md"
                  value={item.amount.toFixed(2)}
                  readOnly
                />
              </div>

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

          <div className="mt-4">
            <button
              type="button"
              className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 text-sm"
              onClick={addProductRow}
            >
              + Add Product
            </button>
          </div>

          {/* Totals  */}
          <div className="mt-6 space-y-2 text-right">
            <div className="text-lg font-semibold">
              Sub Total: <span className="ml-4">Rs. {subtotal.toFixed(2)}</span>
            </div>
            <div className="text-xl font-bold">
              Grand Total: <span className="ml-4">Rs. {grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg"
          >
            Place New Order
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateOrder
