const express = require("express");
const bcrypt = require("bcrypt");
const CompanyModel = require("../models/companyModel");  

const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const {
            companyName,
            email,
            contactNumber,
            contactPerson,
            status,       
            taxNumber,
            taxType,      
            city,
            state,
            province,
            address,
            password,
            description,
        } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);

        if (!companyName || !email || !contactNumber || !contactPerson || !taxNumber ||
            !taxType || !city || !state || !province || !address || !password) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        const existingCompany = await CompanyModel.findOne({ $or: [{ email }, { taxNumber }] });
        if (existingCompany) {
            return res.status(400).json({ error: "Company with the provided email or tax number already exists." });
        }

        const newCompany = new CompanyModel({
            companyName,
            email,
            contactNumber,
            contactPerson,
            status: status || "Active", 
            taxNumber,
            taxType,
            city,
            state,
            province,
            address,
            password: hashedPassword,
            description,
        });

        await newCompany.save();

        const companyResponse = newCompany.toObject();
        delete companyResponse.password;

        res.status(201).json(companyResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {
            companyName,
            email,
            contactNumber,
            contactPerson,
            status,
            taxNumber,
            taxType,
            city,
            state,
            province,
            address,
            password,
            description,
        } = req.body;

        const updatedFields = { 
            companyName, 
            email, 
            contactNumber, 
            contactPerson, 
            status, 
            taxNumber, 
            taxType, 
            city, 
            state, 
            province, 
            address, 
            description 
        };

        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10);
        }

        const updatedCompany = await CompanyModel.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!updatedCompany) {
            return res.status(404).json({ error: "Company not found" });
        }

        const companyResponse = updatedCompany.toObject();
        delete companyResponse.password;

        res.status(200).json(companyResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCompany = await CompanyModel.findByIdAndDelete(id);

        if (!deletedCompany) {
            return res.status(404).json({ error: "Company not found" });
        }

        res.status(200).json({ message: "Company deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/get/:id", async (req, res) => {
    try {
        const id  = req.params.id;
        const company = await CompanyModel.findById(id);

        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }

        const companyResponse = company.toObject();
        delete companyResponse.password;

        res.status(200).json(companyResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/all", async (req, res) => {
    try {
        const companies = await CompanyModel.find();

        if (companies.length === 0) {
            return res.status(404).json({ error: "No companies found" });
        }

        const companiesResponse = companies.map(company => {
            const companyObj = company.toObject();
            delete companyObj.password;
            return companyObj;
        });

        res.status(200).json(companiesResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
