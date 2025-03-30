import React, { useState, useEffect } from 'react'
import TableComponent from '../../components/TableComponent'
import Pagination from '../../components/Pagination'
import { useNavigate, useLocation } from 'react-router-dom'
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'
import ActionButtons from '../../components/ActionButtons'
import SearchBar from '../../components/SearchBar'


const OrderTable = () => {
  const [orders, setOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [deleteData, setDeleteData] = useState(null)
  const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
  const location = useLocation()
  const itemsPerPage = 5

  const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800'
  }

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:5000/order/all')
        
        if (response.ok) {
          const data = await response.json()
          setOrders(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()

    if (location.state?.shouldRefresh) {
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, navigate])

  const handleEdit = (order) => {
    navigate(`/company/edit-order/${order._id}`) 
  }
  const confirmDelete = (order) => {
    setDeleteData(order)
    setShowDeleteConfirmation(true)
  }

  const handleDelete = async () => {
    if (deleteData) {
      try {
        const response = await fetch(`http://localhost:5000/order/delete/${deleteData._id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          setOrders(orders.filter((p) => p._id !== deleteData._id))
        }
      } catch (error) {
        console.error('Error deleting order:', error)
      }
      setShowDeleteConfirmation(false)
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

  const normalizeString = (str) => (str || '').toLowerCase().replace(/[-\s]/g, '')
  const filteredOrders = orders.filter(order => 
    normalizeString(order.partyID?.partyName).includes(normalizeString(searchTerm))
  )

  const transformedData = filteredOrders.map((order, index) => ({
    ...order,
    serialNumber: index + 1,
    partyName: order.partyID?.partyName || 'N/A',
    salesmanName: order.salesmanID?.name || 'N/A',
    grandTotal: `Rs. ${(order.grandTotal || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
    formattedDeliveryDate: formatDate(order.estimatedDeliveryDate),
    status: (
      <span className={`px-2 py-1 rounded-full text-sm ${statusStyles[order.status || 'Pending']}`}>
        {order.status || 'Pending'}
      </span>
    )
  }))

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = transformedData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(transformedData.length / itemsPerPage)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }


  return (
<div className='bg-white min-h-screen w-full relative'>
    <div className='w-full p-2 bg-white rounded-lg'>
      <h2 className="text-xl font-semibold text-left text-black-600 mb-4 mt-10">Manage Orders</h2>
      
      <div className="flex justify-between items-center mb-6">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />         
        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => navigate('/company/create-order')}
        >
          + Create Order
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading orders...</div>
      ) : (
        <>
          <TableComponent
            columns={[
              { label: 'SN', key: 'serialNumber' },
              { label: 'Party', key: 'partyName' },
              { label: 'Delivery Date', key: 'formattedDeliveryDate' },
              { label: 'Salesman', key: 'salesmanName' },
              { label: 'Total', key: 'grandTotal' },
              { label: 'Status', key: 'status' },
            ]}
            data={currentItems}
            emptyMessage="No orders found"
            className="mb-6"
            actions={(order) => (
              <ActionButtons 
                item={order}
                onEdit={handleEdit}
                onDelete={confirmDelete}
              />
            )}
          />

          <DeleteConfirmationModal
            isOpen={showDeleteConfirmation}
            onClose={() => setShowDeleteConfirmation(false)}
            onConfirm={handleDelete}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="justify-center"
            />
          )}
        </>
      )}
    </div>
    </div>
  )
}

export default OrderTable