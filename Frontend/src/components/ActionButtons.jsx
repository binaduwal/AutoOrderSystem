import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaEdit } from 'react-icons/fa'

const ActionButtons = ({ route, onEdit, onDelete }) => (
    <>
      <button
        className="text-black-600 hover:text-indigo-700 font-bold py-1 px-3 rounded mr-1 text-xl"
        onClick={() => onEdit(route)}
      >
        <FaEdit />
      </button>
      <button
        className="text-black-600 hover:text-red-700 font-bold py-1 px-3 rounded mr-2 text-xl"
        onClick={() => onDelete(route)}
      >
        <RiDeleteBin6Line />
      </button>
    </>
  )
  
export default ActionButtons