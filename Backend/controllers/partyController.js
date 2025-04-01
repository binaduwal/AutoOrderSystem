const Party = require('../models/partiesModel')

exports.getAllParties = async (req, res) => {
    try {
        const parties = await Party.find().populate('provinceId cityId locationId routeId partyGroupId')
        res.status(200).json({
            message: 'Parties retrieved successfully',
            data: parties
        })
    } catch (error) {
        res.status(500).json({ 
            message: 'Failed to fetch parties', 
            error: error.message 
        })
    }
}

exports.getPartyById = async (req, res) => {
    try {
        const party = await Party.findById(req.params.id).populate('provinceId cityId locationId routeId partyGroupId')
        if (!party) {
            return res.status(404).json({ 
                message: 'Party not found' 
            })
        }
        res.status(200).json({
            message: 'Party retrieved successfully',
            data: party
        })
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching party', 
            error: error.message 
        })
    }
}

exports.createParty = async (req, res) => {
    try {
        const newParty = new Party(req.body)
        const savedParty = await newParty.save()
        res.status(201).json({
            message: 'Party created successfully',
            party: savedParty
        })
    } catch (error) {
        res.status(500).json({ 
            message: 'Error creating party', 
            error: error.message 
        })
    }
}

exports.updateParty = async (req, res) => {
    try {
        const updatedParty = await Party.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedParty) {
            return res.status(404).json({ 
                message: 'Party not found' 
            })
        }
        res.status(200).json({
            message: 'Party updated successfully',
            data: updatedParty
        })
    } catch (error) {
        res.status(500).json({ 
            message: 'Error updating party', 
            error: error.message 
        })
    }
}

exports.deleteParty = async (req, res) => {
    try {
        const deletedParty = await Party.findByIdAndDelete(req.params.id)
        if (!deletedParty) {
            return res.status(404).json({ 
                message: 'Party not found' 
            })
        }
        res.status(200).json({
            message: 'Party deleted successfully'
        })
    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting party', 
            error: error.message 
        })
    }
}

