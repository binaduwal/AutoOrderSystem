const Category = require('../models/categoryModel');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        const newCategory = new Category(req.body);
        await newCategory.save();

        const populatedCategory = await Category.findById(newCategory._id).populate('companyId');

        res.status(201).json({
            message: "Category created successfully",
            category: populatedCategory
        });
    } catch (err) {
        console.error("Error creating category:", err);
        res.status(400).json({ error: err.message });
    }
};

// Get all categories (optionally filter parents)
exports.getAllCategories = async (req, res) => {
    try {
        const filterParents = req.query.parent === "true";
        const query = filterParents ? { parentId: null } : {};

        const categories = await Category.find(query).populate('companyId');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('companyId');
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update category
exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                category_name: req.body.category_name,
                description: req.body.description,
                status: req.body.status
            },
            { new: true }
        );
        if (!updatedCategory) 
            return res.status(404).json({ error: "Category not found" });

        res.status(200).json({ category: updatedCategory });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get child categories
exports.getChildCategories = async (req, res) => {
    try {
        const { parentId } = req.params;
        const childCategories = await Category.find({ parentId }).populate('companyId');
        if (!childCategories || childCategories.length === 0) {
            return res.status(404).json({ message: "No child categories found" });
        }
        res.status(200).json(childCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
