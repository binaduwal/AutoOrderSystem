const express = require("express")
const router = express.Router()
const partyGroupController = require("../controllers/partyGroupController")

router.post('/create', partyGroupController.create)
router.get('/all', partyGroupController.getAll)
router.get('/:id', partyGroupController.getById)
router.put('/edit/:id', partyGroupController.update)
router.delete('/delete/:id', partyGroupController.delete)

module.exports = router
