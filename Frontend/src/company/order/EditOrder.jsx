import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa6"
import { RiDeleteBin6Line } from "react-icons/ri"

const EditOrder = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  
  const [parties, setParties] = useState([])
  const [salesmen, setSalesmen] = useState([])
  const [paymentModes, setPaymentModes] = useState([])
  const [products, setProducts] = useState([])
  const [orderItems, setOrderItems] = useState([])
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
        const [orderRes, partiesRes, salesmenRes, paymentRes, productsRes] = await Promise.all([
          fetch(`http://localhost:5000/order/${orderId}`),
          fetch('http://localhost:5000/party/all'),
          fetch('http://localhost:5000/salesperson/all'),
          fetch('http://localhost:5000/paymentmode/all'),
          fetch('http://localhost:5000/product/all')
        ])
  
        const orderData = await orderRes.json()
        const partiesData = await partiesRes.json()
        const salesmenData = await salesmenRes.json()
        const paymentData = await paymentRes.json()
        const productsData = await productsRes.json()
  
        // Set dropdown data
        setParties(partiesData.data || [])
        setSalesmen(salesmenData || [])
        setPaymentModes(paymentData || [])
        setProducts(productsData.data || [])
  
        // Set form data
        if (orderData) {
          setFormData({
            party: orderData.partyID?._id || "",
            salesman: orderData.salesmanID?._id || "",
            payment: orderData.paymentModeID?._id || "",
            estimatedDeliveryDate: orderData.estimatedDeliveryDate?.split('T')[0] || "",
            remarks: orderData.remarks || ""
          })
  
// Transform order items
const transformedItems = orderData.orderItems?.map(item => ({
  _id: item._id,
  product: item.productId ? { 
    _id: item.productId._id,
    name: item.productId.name,
    maxSellingPrice: item.productId.maxSellingPrice,
    vatable: item.productId.vatable,
    maxDiscount: item.productId.maxDiscount
  } : null,
  price: item.price || 0,
  quantity: item.quantity || 1,
  discount: item.discount || 0,
  maxDiscount: item.productId?.maxDiscount || 0,
  vat: item.vatAmount || 0, 
  rate: item.rate || 0,
  amount: item.totalAmount || 0 
})) || []          
          setOrderItems(transformedItems)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [orderId])

  // Product row management
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

  const removeProductRow = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index))
  }

  // Product selection handler
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

  // Input change handler
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

  // Value calculations
  const calculateValues = (item) => {
    if (item.product && item.product.vatable) {
      const rate = item.price / (1 + 0.13);
      const amount = rate * item.quantity;
      const vatAmount = (item.price - rate) * item.quantity;
      return {
        ...item,
        rate: Number(rate.toFixed(2)),
        amount: Number(amount.toFixed(2)),
        vat: Number(vatAmount.toFixed(2))
      }
    } else {
      const amount = item.price * item.quantity;
      return {
        ...item,
        rate: Number(item.price.toFixed(2)),
        amount: Number(amount.toFixed(2)),
        vat: 0
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const orderPayload = {
      estimatedDeliveryDate: new Date(formData.estimatedDeliveryDate).toISOString(),
      partyID: formData.party,
      remarks: formData.remarks,
      salesmanID: formData.salesman,
      paymentModeID: formData.payment,
      orderItems: orderItems.map(item => ({
        _id: item._id, 
        productId: item.product?._id,
        price: item.price,
        quantity: item.quantity,
        discount: item.discount,
        vat: item.vat,
        rate: item.rate,
        amount: item.amount
      })),
      grandTotal: orderItems.reduce((sum, item) => sum + item.amount + item.vat, 0)
    }
  
    try {
      const response = await fetch(`http://localhost:5000/order/edit/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        navigate('/company/order', { state: { shouldRefresh: true } })
      } else {
        console.error('Failed to update order:', data)
      }
    } catch (error) {
      console.error('Error submitting order:', error)
    }
  }

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.amount, 0)
  const totalVat = orderItems.reduce((sum, item) => sum + item.vat, 0)
  const grandTotal = subtotal + totalVat

  return (
    <div className="max-w-full mx-auto bg-white p-8 rounded-lg">
      <div className='ml-20 mr-20'>
      <h2 className="text-lg font-medium mb-4 flex items-center">
        Orders <FaAngleRight className="mx-1"/> Edit Order
      </h2>

      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        {/* Order Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-black-700">Order Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Party</label>
              <select
                className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.party}
                onChange={(e) => setFormData({...formData, party: e.target.value})}
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
                className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.salesman}
                onChange={(e) => setFormData({...formData, salesman: e.target.value})}
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

        {/* Delivery & Payment */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Delivery Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.estimatedDeliveryDate}
                onChange={(e) => setFormData({...formData, estimatedDeliveryDate: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Payment</label>
              <select
                className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.payment}
                onChange={(e) => setFormData({...formData, payment: e.target.value})}
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
              className="w-sm p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 h-20"
              value={formData.remarks}
              onChange={(e) => setFormData({...formData, remarks: e.target.value})}
              placeholder="Enter order remarks"
            ></textarea>
          </div>
        </div>

        {/* Product Table */}
        <div className="max-w-4xl mx-auto mt-8 p-3 bg-white rounded-lg overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-4 bg-gray-50 p-3 rounded-t-lg ">
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
            <div key={index} className="grid grid-cols-8 gap-4 items-center p-3">
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
                  onClick={() => removeProductRow(index)}
                  disabled={orderItems.length === 1}
                >
                  <RiDeleteBin6Line/>
                </button>
              </div>
            </div>
          ))}
            </div>
            
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
          <div className="mt-6 space-y-2 text-right">
            <div className="text-lg font-semibold">
              Sub Total: <span className="ml-4">Rs. {subtotal.toFixed(2)}</span>
            </div>
            <div className="text-lg font-bold">
              Grand Total: <span className="ml-4">Rs. {grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="w-full md:w-auto bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg"
          >
            Update Order
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default EditOrder