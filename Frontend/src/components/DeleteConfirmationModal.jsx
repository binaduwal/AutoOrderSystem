import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
<div className="absolute inset-0 flex justify-center items-center bg-white-500 bg-opacity-50">
<div className="relative bg-white p-8 rounded-xl shadow-2xl w-[400px] border border-gray-200">     
     <h2 className="text-lg text-center font-semibold text-gray-800 mb-4">
          Are you sure you want to delete this?
        </h2>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
