const express = require('express')
const Category = require('../models/categoryModel') 
const router = express.Router()

router.post("/create", async (req, res) => {
    try {
      const newCategory = new Category(req.body)
      await newCategory.save()
  
      const populatedCategory = await Category.findById(newCategory._id).populate('companyId')
      
      res.status(201).json({
        message: "Category created successfully",
        category: populatedCategory
      })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })  
  
  router.get('/all', async (req, res) => {
try {
    const categories = await Category.find().populate('companyId')
    res.status(200).json(categories)
} catch (error) {
    res.status(500).json({ message: error.message })
}
})
 
router.get('/:id', async (req, res) => {
    try {
      const category = await Category.findById(req.params.id).populate('companyId')
      if (!category) {
        return res.status(404).json({ message: 'Category not found' })
      }
      res.status(200).json(category)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })
  
  router.put("/edit/:id", async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).populate("companyId")
  
      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" })
      }
  
      res.status(200).json({
        message: "Category updated successfully",
        category: updatedCategory
      })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })

router.delete("/delete/:id", async (req, res) => {
try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id)
    if (!deletedCategory) {
    return res.status(404).json({ error: "Category not found" })
    }

    res.status(200).json({
    message: "Category deleted successfully"
    })
} catch (err) {
    res.status(400).json({ error: err.message })
}
})
  
  
module.exports = router
