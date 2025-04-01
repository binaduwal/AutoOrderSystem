import React, { useState, useEffect } from 'react';

const EditProduct = ({ productData, onUpdated }) => {
  const [formData, setFormData] = useState({
    name: productData?.name || '',
    productCode: productData?.productCode || '',
    vatable: productData?.vatable || true,
    productImage: productData?.productImage || '',
    maxSellingPrice: productData?.maxSellingPrice || 0,
    maxDiscount: productData?.maxDiscount || 0,
    status: productData?.status === 'active' ? 'Active' : 'Inactive',
    categoryId: productData?.categoryId || '',
  });
  const [selectedUnit, setSelectedUnit] = useState(productData?.productUnitId || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    productData?.productImage ? `http://localhost:5000/uploads/${productData.productImage}` : ''
  );

  useEffect(() => {
    if (productData?._id) {
      const fetchDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/product/${productData._id}`);
          if (response.ok) {
            const data = await response.json();
            setFormData({
              name: data.name || '',
              productCode: data.productCode || '',
              vatable: data.vatable,
              productImage: data.productImage || '',
              maxSellingPrice: data.maxSellingPrice || 0,
              maxDiscount: data.maxDiscount || 0,
              status: data.status === 'active' ? 'Active' : 'Inactive',
              categoryId: data.categoryId || '',
            });
            setSelectedUnit(data.productUnitId || '');
            if (data.productImage) {
              setPreviewImage(`http://localhost:5000/uploads/${data.productImage}`);
            }
          } else {
            alert('Failed to fetch product details.');
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };
      fetchDetails();
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'vatable' ? value === 'true' : value,
    }));
  };

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleFileUpload = async (file) => {
    const data = new FormData();
    data.append("file-upload", file);
    const res = await fetch('http://localhost:5000/product/upload', {
      method: 'POST',
      body: data,
    });
    if (res.ok) {
      const responseData = await res.json();
      return responseData.filename;
    } else {
      throw new Error("File upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let fileUrl = formData.productImage;
    if (selectedFile) {
      try {
        fileUrl = await handleFileUpload(selectedFile);
      } catch (error) {
        console.error("File upload failed", error);
        return;
      }
    }
    const payload = {
      ...formData,
      status: formData.status === 'Active' ? 'active' : 'inactive',
      productUnitId: selectedUnit,
      productImage: fileUrl,
    };
    if (!payload.categoryId) {
      delete payload.categoryId;
    }
    try {
      const response = await fetch(`http://localhost:5000/product/edit/${productData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const updatedData = await response.json();
        console.log('Product updated:', updatedData);
        onUpdated(updatedData);
      } else {
        const result = await response.json();
        console.error('Failed to update product:', result);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="max-h-auto w-full mx-auto bg-white p-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <div className="overflow-y-auto max-h-[500px]">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Product Name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="productCode">
              Product Code
            </label>
            <input
              type="text"
              name="productCode"
              value={formData.productCode}
              onChange={handleChange}
              placeholder="Enter Product Code"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="maxSellingPrice">
              Selling Price
            </label>
            <input
              type="number"
              name="maxSellingPrice"
              value={formData.maxSellingPrice}
              onChange={handleChange}
              placeholder="Enter Selling Price"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="maxDiscount">
              Max Discount Allowed
            </label>
            <input
              type="number"
              name="maxDiscount"
              value={formData.maxDiscount}
              onChange={handleChange}
              placeholder="Enter Discount"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="vatable">
              VAT
            </label>
            <select
              name="vatable"
              value={formData.vatable ? "true" : "false"}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="unit">
              Unit
            </label>
            <select
              name="unit"
              value={selectedUnit}
              onChange={handleUnitChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select Unit</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="categoryId">
              Category
            </label>
            <select
              name="categoryId"
              value={formData.categoryId || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select Category</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="status">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

<div className="col-span-full">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-900">
              Image
            </label>
            <div className="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded mb-2"
                />
              ) : (
                <p className="text-sm text-gray-600 mb-2">No file chosen</p>
              )}
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload-input"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload-input"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>


          <div className="col-span-full">
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
