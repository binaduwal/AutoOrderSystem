import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ActionButtons = ({ item, onEdit, onDelete, extraButtons }) => (
  <div className="flex items-center space-x-1">
    {onEdit && (
      <button
        className="text-black-600 hover:text-indigo-700 font-bold py-1 rounded text-xl"
        onClick={() => onEdit(item)}
      >
        <FaEdit />
      </button>
    )}
    {onDelete && (
      <button
        className="text-black-600 hover:text-red-700 font-bold py-1 px-3 rounded text-xl"
        onClick={() => onDelete(item)}
      >
        <RiDeleteBin6Line />
      </button>
    )}
    {extraButtons}
  </div>
);

export default ActionButtons;
