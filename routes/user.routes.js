const express = require('express')
const router = express.Router()
const userController = require ("../controllers/user.controller")
const isAuthenticated = require("../middlewares/isAuthenticated")


router.get('/',isAuthenticated, userController.getUser)
router.post('/', isAuthenticated, userController.registerUser)



module.exports = router