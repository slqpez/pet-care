const express = require('express')
const router = express.Router()
const userController = require ("../controllers/user.controller")
const isAuthenticated = require("../middlewares/isAuthenticated")


router.get('/user',isAuthenticated, userController.getUser)
router.get('/user/:userId',isAuthenticated, userController.getUserByID)
router.get("/", isAuthenticated, userController.getUsers)
router.post('/', isAuthenticated, userController.registerUser)
router.put('/:userId', isAuthenticated, userController.editUser)




router.delete("/:userId", isAuthenticated, userController.deleteUser)
router.put('/:userId', isAuthenticated, userController.editUser)


module.exports = router