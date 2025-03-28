const express = require('express')
const partyController= require('../controllers/partyController')

const router = express.Router()

router.get('/all', partyController.getAllParties) 
router.get('/:id', partyController.getPartyById) 
router.post('/create', partyController.createParty) 
router.put('/edit/:id', partyController.updateParty) 
router.delete('/delete/:id', partyController.deleteParty)

module.exports = router
