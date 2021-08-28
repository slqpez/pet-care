const express = require('express')
const router = express.Router()
const usersController = require ("../controllers/users.controller")
const isAuthenticated = require("../middlewares/isAuthenticated")


router.post('/',  usersController.registerUser)
router.post("/getUser",usersController.getUser)



module.exports = router