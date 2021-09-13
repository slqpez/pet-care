const express = require('express')
const router = express.Router()
const usersController = require ("../controllers/users.controller")
const isAuthenticated = require("../middlewares/isAuthenticated")


router.get('/',isAuthenticated, usersController.getUser)
router.post('/', isAuthenticated, usersController.registerUser)



module.exports = router