const PaymentMode = require('../models/paymentModeModel');

exports.createPaymentMode = async (req, res) => {
  try {
    const newPaymentMode = new PaymentMode(req.body);
    await newPaymentMode.save();
    res.status(201).json({
      message: "Payment mode created Successfully",
      paymentmode: newPaymentMode,
    });
  } catch (error) {
    console.error("Error creating payment mode:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPaymentModes = async (req, res) => {
  try {
    const paymentModes = await PaymentMode.find();
    res.json(paymentModes);
  } catch (error) {
    console.error("Error while fetching payment modes:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getPaymentModeById = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentMode = await PaymentMode.findById(id);
    if (!paymentMode) {
      return res.status(404).json({ error: "Payment mode not found" });
    }
    res.json(paymentMode);
  } catch (error) {
    console.error("Error while fetching payment mode:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updatePaymentMode = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.body) {
      return res.status(400).json({ message: "No update data provided" });
    }
    const updatedPaymentMode = await PaymentMode.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
      message: "Updated Successfully",
      updated: updatedPaymentMode,
    });
  } catch (error) {
    console.error("Error while updating payment mode:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deletePaymentMode = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPaymentMode = await PaymentMode.findByIdAndDelete(id);
    if (!deletedPaymentMode) {
      return res.json({ message: "Payment mode not deleted" });
    }
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.error("Error while deleting payment mode:", error);
    res.status(500).json({ error: 'Server error' });
  }
};
