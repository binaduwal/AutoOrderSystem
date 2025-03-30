import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx + 1}
          onClick={() => onPageChange(idx + 1)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === idx + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          {idx + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
