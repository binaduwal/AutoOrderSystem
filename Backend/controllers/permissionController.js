const Permission = require('../models/permissionModel')

exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find()
        res.json(permissions)    
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}

exports.getPermissionById = async (req, res) => {
    const { id } = req.params
    try {
        const permission = await Permission.findById(id)

        if (!permission) {
            return res.status(404).json({ error: 'Permission not found' })
        }

        res.json(permission)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}

exports.createPermission = async (req, res) => {
    const { name, display_name, description } = req.body
    try {
        const newPermission = await Permission.create({
            name,
            display_name,
            description
        })
        res.status(201).json(newPermission)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}

exports.updatePermission = async (req, res) => {
    const { id } = req.params
    const { name, display_name, description } = req.body

    try {
        const updatedPermission = await Permission.findByIdAndUpdate(
            id,
            { name, display_name, description },
            { new: true }
        )

        if (!updatedPermission) {
            return res.status(404).json({ error: 'Permission not found' })
        }

        res.json(updatedPermission)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}

exports.deletePermission = async (req, res) => {
    const { id } = req.params
    try {
        const deletedPermission = await Permission.findByIdAndDelete(id)

        if (!deletedPermission) {
            return res.status(404).json({ error: 'Permission not found' })
        }

        res.json({ message: 'Permission deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}
