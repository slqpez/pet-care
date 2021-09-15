const express = require('express')
const router = express.Router()
const ownerController = require ("../controllers/owner.controller")
const isAuthenticated = require("../middlewares/isAuthenticated")


router.post('/', ownerController.registerOwner) 



module.exports = router