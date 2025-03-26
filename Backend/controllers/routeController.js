const Route = require('../models/routeModel')

// Create a new route
exports.createRoute = async (req, res) => {
    try {
        const newRoute = new Route(req.body)
        await newRoute.save()
        res.status(201).json({
            message: "Route created successfully",
            route: newRoute
        })
    } catch (error) {
        console.error("Error creating Route:", error)
        res.status(400).json({ error: error.message })
    }
}

// Get all routes
exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find()
        res.json(routes)
    } catch (error) {
        console.error("Error while fetching routes:", error)
        res.status(500).json({ error: 'Server error' })
    }
}

// Get a single route by ID
exports.getRouteById = async (req, res) => {
    try {
        const { id } = req.params
        const route = await Route.findById(id)

        if (!route) {
            return res.status(404).json({ error: "Route not found" })
        }
        res.json(route)
    } catch (error) {
        console.error("Error while fetching route:", error)
        res.status(500).json({ error: 'Server error' })
    }
}

// Update a route
exports.updateRoute = async (req, res) => {
    try {
        const { id } = req.params
        if (!req.body) {
            return res.status(400).json({ message: "No update data provided" })
        }
        const updatedRoute = await Route.findByIdAndUpdate(id, req.body, { new: true })
        res.json({
            message: "Updated successfully",
            updated: updatedRoute
        })
    } catch (error) {
        console.error("Error while updating route:", error)
        res.status(500).json({ error: 'Server error' })
    }
}

// Delete a route
exports.deleteRoute = async (req, res) => {
    try {
        const { id } = req.params
        const deletedRoute = await Route.findByIdAndDelete(id)

        if (!deletedRoute) {
            return res.status(404).json({ message: "Route not found" })
        }
        res.json({
            message: "Deleted successfully"
        })
    } catch (error) {
        console.error("Error while deleting route:", error)
        res.status(500).json({ error: 'Server error' })
    }
}
