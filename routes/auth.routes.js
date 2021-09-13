const express = require('express')
const router = express.Router()
const authController = require ("../controllers/auth.controller")
const isAuthenticated = require("../middlewares/isAuthenticated")


router.post('/login',  authController.login)
//router.post('/refresh', authController.refreshToken )



module.exports = router