const Salesperson = require('../models/salespersonModel')

// Create a new route
exports.create = async (req, res) => {
    try {
        const newData = new Salesperson(req.body)
        await newData.save()
        res.status(201).json({
            message: "Sales Person created successfully",
            salesperson: newData
        })
    } catch (error) {
        console.error("Error creating Salesperson:", error)
        res.status(400).json({ error: error.message })
    }
}
// Get all routes
exports.getAll = async (req, res) => {
    try {
        const salesperson = await Salesperson.find()
        res.json(salesperson)
    } catch (error) {
        console.error("Error while fetching Salesperson:", error)
        res.status(500).json({ error: 'Server error' })
    }
}

// Get a single route by ID
exports.getById = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Salesperson.findById(id)

        if (!data) {
            return res.status(404).json({ error: "Salesperson not found" })
        }
        res.json(data)
    } catch (error) {
        console.error("Error while fetching Salesperson:", error)
        res.status(500).json({ error: 'Server error' })
    }
}

// Update a route
exports.update = async (req, res) => {
    try {
        const { id } = req.params
        if (!req.body) {
            return res.status(400).json({ message: "No update data provided" })
        }
        
        
        const UpdatedData = await Salesperson.findByIdAndUpdate(id, req.body, { new: true })
        res.json({
            message: "Updated successfully",
            updated: UpdatedData
        })
    } catch (error) {
        console.error("Error while updating Salesperson:", error)
        res.status(500).json({ error: 'Server error' })
    }
}
// Delete a route
exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        const deletedData = await Salesperson.findByIdAndDelete(id)

        if (!deletedData) {
            return res.status(404).json({ message: " Data not found" })
        }
        res.json({
            message: "Deleted successfully"
        })
    } catch (error) {
        console.error("Error while deleting data:", error)
        res.status(500).json({ error: 'Server error' })
    }
}
