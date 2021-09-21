const express = require('express')
const router = express.Router()
const userController = require ("../controllers/user.controller")
const isAuthenticated = require("../middlewares/isAuthenticated")


router.get('/user/',isAuthenticated, userController.getUser)
router.get("/", isAuthenticated, userController.getUsers)
router.post('/', isAuthenticated, userController.registerUser)



module.exports = router