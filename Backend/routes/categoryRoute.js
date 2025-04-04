const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post("/create", categoryController.createCategory);
router.get('/all', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put("/edit/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);
router.get('/children/:parentId', categoryController.getChildCategories);

module.exports = router;
