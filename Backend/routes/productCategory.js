const express=require('express')
const router=express.Router()
const ProductCategory=require('../models/productModel')
const multer=require('multer')
const path = require('path');
const fs = require("fs")

const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null, path.join(__dirname, '../uploads'))  },
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }

})

const upload=multer({storage})

router.post('/upload',upload.single('file-upload'),(req,res)=>{
if(req.file){ 
  res.json({filename:req.file.filename})
}
else{
  res.status(400).json({error:"File upload failed"})
}
})

router.post("/create",async(req,res)=>{
    try{
        const newProduct=new ProductCategory(req.body)
        await newProduct.save()
        res.status(201).json({
            message:"Product created successfully",
            product:newProduct
        })
    }
    catch(error)
    {
        console.error("Error creating product:",error)
        res.status(400).json({error:error.message})
    }
})

router.get('/all',async(req,res)=>
{
    try{
        const product=await ProductCategory.find()
        res.json(product)
    }

    catch(error){
        console.error("Error fetching product:",error)
        res.status(500).json({error:'Server error'})
    }
}
)

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedProduct = await ProductCategory.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (deletedProduct.productImage) {
            const imagePath = path.join(__dirname, "..", "uploads", deletedProduct.productImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log(`Deleted image: ${imagePath}`);
            } else {
                console.log(`Image file not found: ${imagePath}`);
            }
        }

        res.json({ message: "Product deleted successfully", deletedProduct });

    } catch (error) {
        console.error("Failed to delete", error);
        res.status(500).json({ error: "Server error" });
    }
});



// router.put("/edit/:id",async(req,res)=>{
//     const {id}=req.params
//     try{
//         const updatedProduct=await ProductCategory.findByIdAndUpdate(id,
//         req.body, 
//         { new: true })
//     if(!updatedProduct)
//     {
//         return res.status(404).json({
//             error:"Not found"
//         })
//     }
//     res.json(updatedProduct)
//     }

//     catch(error)
//     {
//         console.error(error)
//         res.status(500).json({
//             error:"Server error"
//         })
//     }
// })

const { ObjectId } = require('mongoose').Types

router.put("/edit/:id", async (req, res) => {
  const { id } = req.params

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID" })
  }

  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No data provided for update" })
    }

    const updatedProduct = await ProductCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.json(updatedProduct)
  } catch (error) {
    console.error("Error updating product:", error)

    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message })
    }

    res.status(500).json({ error: "Server error" })
  }
})

module.exports=router