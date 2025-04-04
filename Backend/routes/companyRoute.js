const express = require("express")
const router = express.Router()
const {
    createCompany,
    editCompany,
    deleteCompany,
    getCompanyById,
    getAllCompanies,
    loginCompany,
    updatePassword
} = require("../controllers/companycontroller")

router.post("/create", createCompany)
router.put("/edit/:id", editCompany)
router.delete("/delete/:id", deleteCompany)
router.get("/edit/:id", getCompanyById)
router.get("/all", getAllCompanies)
router.post("/login", loginCompany)
router.put("/update-password/:id", updatePassword)

module.exports = router
