// const express = require('express')
// const Category = require('../models/categoryModel') 
// const router = express.Router()

// router.post("/create", async (req, res) => {
//     try {
//         console.log("Received request body:", req.body); 

//         const newCategory = new Category(req.body);
//         await newCategory.save();

//         const populatedCategory = await Category.findById(newCategory._id).populate('companyId');

//         res.status(201).json({
//             message: "Category created successfully",
//             category: populatedCategory
//         });
//     } catch (err) {
//         console.error("Error creating category:", err); 
//         res.status(400).json({ error: err.message });
//     }
// });
  
// router.get('/all', async (req, res) => {
//   try {
//     const filterParents = req.query.parent === "true";
//     const query = filterParents ? { parentId: null } : {};
    
//     const categories = await Category.find(query).populate('companyId');
//     res.status(200).json(categories);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
 
// router.get('/:id', async (req, res) => {
//     try {
//       const category = await Category.findById(req.params.id).populate('companyId')
//       if (!category) {
//         return res.status(404).json({ message: 'Category not found' })
//       }
//       res.status(200).json(category)
//     } catch (error) {
//       res.status(500).json({ message: error.message })
//     }
//   })
  

//   router.put("/edit/:id", async (req, res) => {
//     try {
//       const updatedCategory = await Category.findByIdAndUpdate(
//         req.params.id,
//         {
//           category_name: req.body.category_name,
//           description: req.body.description,
//           status: req.body.status
//         },
//         { new: true }
//       )
//       if (!updatedCategory) 
//         return res.status(404).json({ error: "Category not found" })
//       res.status(200).json({ category: updatedCategory })
//     } catch (err) {
//       res.status(400).json({ error: err.message })
//     }
//   })

// router.delete("/delete/:id", async (req, res) => {
// try {
//     const deletedCategory = await Category.findByIdAndDelete(req.params.id)
//     if (!deletedCategory) {
//     return res.status(404).json({ error: "Category not found" })
//     }

//     res.status(200).json({
//     message: "Category deleted successfully"
//     })
// } catch (err) {
//     res.status(400).json({ error: err.message })
// }
// })
  
// router.get('/children/:parentId', async (req, res) => {
//   try {
//     const { parentId } = req.params;
//     const childCategories = await Category.find({ parentId }).populate('companyId');
//     if (!childCategories || childCategories.length === 0) {
//       return res.status(404).json({ message: "No child categories found" });
//     }
//     res.status(200).json(childCategories);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

  
// module.exports = router


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
