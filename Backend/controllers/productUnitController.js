const ProductUnit = require("../models/productUnitModel");

exports.createProductUnit = async (req, res) => {
  try {
    const unit = new ProductUnit(req.body);
    await unit.save();
    res.status(201).json({ message: "Unit created successfully", unit });
  } catch (error) {
    console.error("Error while creating unit:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProductUnits = async (req, res) => {
  try {
    const products = await ProductUnit.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching product units:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getProductUnitById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductUnit.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product unit not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product unit:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateProductUnit = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await ProductUnit.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product unit not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product unit:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteProductUnit = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductUnit.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product unit not found" });
    }
    res.json({ message: "Product unit deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Failed to delete product unit:", error);
    res.status(500).json({ error: "Server error" });
  }
};
