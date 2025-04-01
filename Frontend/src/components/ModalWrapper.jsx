import React from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io"


const ModalWrapper = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null
  
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      >
        <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[500px] border border-gray-200">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <IoMdCloseCircleOutline className="text-2xl" />
          </button>
          {children}
        </div>
      </div>
    )
  }
  
export default ModalWrapper