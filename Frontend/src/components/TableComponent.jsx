import React from 'react';

const TableComponent = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-3 py-3 text-left text-xs font-medium text-black-700 uppercase"
              >
                {col.label}
              </th>
            ))}
            {actions && <th className="px-3 py-3 text-center text-xs font-medium text-black-700 uppercase">Actions</th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-3 text-sm text-black-700">
                  {item[col.key]}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3 text-sm text-center text-black-700">
                  {actions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
