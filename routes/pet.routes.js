const express = require('express')
const router = express.Router()
const petController = require ("../controllers/pet.controller")
const isAuthenticated = require("../middlewares/isAuthenticated")


router.get('/', petController.getPets)
router.get('/:petId', petController.getPetById)
router.post('/', petController.registerPet)
router.put('/:petId', petController.updatePet)
router.delete('/:petId', petController.deletePet) 



module.exports = router