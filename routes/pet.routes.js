const express = require('express')
const router = express.Router()
const petController = require ("../controllers/pet.controller")
const isAuthenticated = require("../middlewares/isAuthenticated")


router.get('/', petController.getPets)
router.get('/pet/:petId', petController.getPetById)
router.post('/', petController.registerPet)
router.put('/pet/:petId', petController.updatePet)
router.delete('/pet/:petId', petController.deletePet) 



module.exports = router