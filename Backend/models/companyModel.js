const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    contactPerson: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    taxNumber: { type: String, required: true, unique: true },
    taxType: { type: String, enum: ["PAN", "VAT"], required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

const CompanyModel=mongoose.model("CompanyModel", companySchema);
module.exports =CompanyModel
