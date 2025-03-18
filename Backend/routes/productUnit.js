const express=require("express")
const router=express.Router()
const ProductUnit = require("../models/productUnitModel")

router.post("/create", async (req,res)=>
{
try{
    const unit=new ProductUnit(req.body)
    await unit.save()
    res.status(201).json({
        message:"Unit created Successfully",
        unit:unit
    })
    }

    catch(error)
    {
        console.error("Error while creating Unit",error)
        res.status(400).json({error:error.message})

    }
})


router.get("/all",async(req,res)=>{
    try{
     const product=await ProductUnit.find()
     res.json(product)
    }
    catch(error){
        console.error("Error fetching product:",error)
        res.status(500).json({error:'Server error'})
    }

})


router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    try {
        const deletedProduct = await ProductUnit.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(404).json({ error: "Unit not found" })
        }
        res.json({ message: "Unit deleted successfully", deletedProduct })
    } catch (error) {
        console.error("Failed to delete", error)
        res.status(500).json({ error: "Server error" })
    }
})

router.put("/edit/:id",async(req,res)=>{
    const {id}=req.params
    try{
        const updatedProduct=await ProductUnit.findByIdAndUpdate(id)
    if(!updatedProduct)
    {
        return res.status(404).json({
            error:"Not found"
        })
    }
    res.json(updatedProduct)
    }

    catch(error)
    {
        console.error(error)
        res.status(500).json({
            error:"Server error"
        })
    }
})

module.exports=router
