const PartyGroup = require('../models/partyGroupModel')

// Create a new route
exports.create = async (req, res) => {
    try {
        const { partyGroupName } = req.body
        const existingGroup = await PartyGroup.findOne({ partyGroupName })
        if (existingGroup) {
            return res.status(400).json({ error: "Party Group with the same name already exists" })
        }

        const newPartyGroup = new PartyGroup(req.body)
        await newPartyGroup.save()
        res.status(201).json({
            message: "Party Group created successfully",
            partyGroup: newPartyGroup
        })
    } catch (error) {
        console.error("Error creating Party Group:", error)
        res.status(400).json({ error: error.message })
    }
}
// Get all routes
exports.getAll = async (req, res) => {
    try {
        const partyGroup = await PartyGroup.find()
        res.json(partyGroup)
    } catch (error) {
        console.error("Error while fetching PartyGroup:", error)
        res.status(500).json({ error: 'Server error' })
    }
}

// Get a single route by ID
exports.getById = async (req, res) => {
    try {
        const { id } = req.params
        const data = await PartyGroup.findById(id)

        if (!data) {
            return res.status(404).json({ error: "Party Group not found" })
        }
        res.json(data)
    } catch (error) {
        console.error("Error while fetching Party Group:", error)
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
        
        if (req.body.partyGroupName) {
            const existingGroup = await PartyGroup.findOne({ partyGroupName: req.body.partyGroupName })
            if (existingGroup && existingGroup._id.toString() !== id) {
                return res.status(400).json({ error: "Party Group with the same name already exists" })
            }
        }
        
        const UpdatedData = await PartyGroup.findByIdAndUpdate(id, req.body, { new: true })
        res.json({
            message: "Updated successfully",
            updated: UpdatedData
        })
    } catch (error) {
        console.error("Error while updating Party Group:", error)
        res.status(500).json({ error: 'Server error' })
    }
}
// Delete a route
exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        const deletedData = await PartyGroup.findByIdAndDelete(id)

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
