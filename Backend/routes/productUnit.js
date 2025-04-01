const express = require("express");
const router = express.Router();
const productUnitController = require("../controllers/productUnitController");

router.post("/create", productUnitController.createProductUnit);
router.get("/all", productUnitController.getAllProductUnits);
router.get("/:id", productUnitController.getProductUnitById);
router.put("/edit/:id", productUnitController.updateProductUnit);
router.delete("/delete/:id", productUnitController.deleteProductUnit);

module.exports = router;
