const express = require('express')
const router = express.Router()
const ownerController = require ("../controllers/owner.controller")
const isAuthenticated = require("../middlewares/isAuthenticated")


router.get('/', ownerController.getOwners)
router.get('/:ownerId', ownerController.getOwnerById)
router.post('/', ownerController.registerOwner)
router.put('/:ownerId', ownerController.updateOwner)
router.delete('/:ownerId', ownerController.deleteOwner)



module.exports = router