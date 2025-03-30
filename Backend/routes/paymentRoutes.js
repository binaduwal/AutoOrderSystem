const express=require("express")
const router=express.Router()
const PaymentMode=require('../models/paymentModeModel')

router.post('/create',async(req,res)=>{
try {
    const newPaymentMode=new PaymentMode(req.body)
    await newPaymentMode.save()
    res.status(201).json({
        message:"Payment mode created Successfully",
        paymentmode:newPaymentMode
    })
} catch (error) {
    console.error("Error creating payment mode:",error)
    res.status(400).json({error:error.message})
}
})

router.get('/all',async(req,res)=>{
    try {
       const paymentMode=await PaymentMode.find()
       res.json(paymentMode)
    } catch (error) {
       console.error("Error while fetching payment") 
       res.status(500).json({error:'Server error'})
    }
})

router.get('/:id',async(req,res)=>{
    try {
    const {id}=req.params
       const paymentMode=await PaymentMode.findById(id)

       if(!paymentMode){
        return res.status(404).json({error:"Payment mode not found"})
       }
       res.json(paymentMode)
    } catch (error) {
       console.error("Error while fetching payment") 
       res.status(500).json({error:'Server error'})
    }
})

router.put('/edit/:id',async(req,res)=>{
    const {id}=req.params
    try {
       if (!req.body) {
        return res.status(400).json({ message: "No update data provided" });
    }
       const updatedPaymentMode=await PaymentMode.findByIdAndUpdate(id,req.body,{new:true}) 
       res.json({
        message:"Updated Successfully",
        updated:updatedPaymentMode
       })
    } catch (error) {
        console.error("Error while updating payment") 
        res.status(500).json({error:'Server error'})
  
    }
})


router.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const deletedPaymentMode=await PaymentMode.findByIdAndDelete(id)
    
        if(!deletedPaymentMode){
            return res.json({
                message:"Payment Mode not deleted"
            })
        }
        res.json({
            message:"Deleted Successfully"
    
        })
       
    } catch (error) {
        console.error("Error while deleting payment") 
        res.status(500).json({error:'Server error'})
    }
})

module.exports=router