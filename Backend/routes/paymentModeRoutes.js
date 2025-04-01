const express = require("express");
const router = express.Router();
const paymentModeController = require("../controllers/paymentModeController");

router.post('/create', paymentModeController.createPaymentMode);
router.get('/all', paymentModeController.getAllPaymentModes);
router.get('/:id', paymentModeController.getPaymentModeById);
router.put('/edit/:id', paymentModeController.updatePaymentMode);
router.delete('/delete/:id', paymentModeController.deletePaymentMode);

module.exports = router;
