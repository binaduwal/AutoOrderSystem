import React, { useState, useEffect } from 'react'
import TableComponent from '../../components/TableComponent'
import Pagination from '../../components/Pagination'
import { CiSearch } from "react-icons/ci"
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaEdit } from 'react-icons/fa'
import { useNavigate, useLocation } from 'react-router-dom'

const OrderTable = () => {
  const [orders, setOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const location = useLocation() 
  const itemsPerPage = 5

  const columns = [
    { label: 'SN', key: 'serialNumber' },
    { label: 'Party', key: 'partyName' },
    { label: 'Delivery Date', key: 'formattedDeliveryDate' },
    { label: 'Salesman', key: 'salesmanName' },
    { label: 'Total', key: 'grandTotal' },
    { label: 'Status', key: 'status' },
  ]

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/order/all')
        if (response.ok) {
          const data = await response.json()
          setOrders(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }
    fetchDetails()

    if (location.state?.shouldRefresh) {
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, navigate])

  // Search filtering logic
  const normalizeString = (str) => (str || '').toLowerCase().replace(/[-\s]/g, '')
  const filteredOrders = orders.filter(order => 
    normalizeString(order.partyID?.partyName).includes(normalizeString(searchTerm))
  )

  // Function to compute the grand total in case it isn’t stored with the order
  const computeGrandTotal = (order) => {
    try {
      return (order.orderItems || []).reduce((sum, item) => {
        const amount = Number(item.amount) || 0
        const vat = Number(item.vat) || 0
        return sum + amount + vat
      }, 0)
    } catch (error) {
      console.error('Error calculating total:', error)
      return 0
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const transformedData = filteredOrders.map((order, index) => {
    const partyName = order.partyID?.partyName || order.partyName || 'N/A'
    const salesmanName = order.salesmanID?.name || order.salesmanName || 'N/A'
    const total = order.grandTotal !== undefined ? Number(order.grandTotal) : computeGrandTotal(order)
    
    return {
      ...order,
      serialNumber: index + 1,
      partyName,
      salesmanName,
      grandTotal: `Rs. ${total.toLocaleString('en-IN')}`,
      formattedDeliveryDate: formatDate(order.estimatedDeliveryDate),
      status: order.status || 'Pending'
    }
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = transformedData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(transformedData.length / itemsPerPage)

  const actions = (order) => (
    <div className="flex">
      <button
        className="text-blue-600 hover:text-blue-800 mr-3"
      >
        <FaEdit size={18} />
      </button>
      <button
        className="text-red-600 hover:text-red-800"
        onClick={() => console.log('Delete order:', order._id)}
      >
        <RiDeleteBin6Line size={18} />
      </button>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by party name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => navigate('/company/create-order')}
        >
          + Create Order
        </button>
      </div>

      <TableComponent
        columns={columns}
        data={currentItems}
        actions={actions}
        emptyMessage="No orders found"
        className="mb-6"
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="justify-center"
        />
      )}
    </div>
  )
}

export default OrderTable
