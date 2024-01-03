const express = require('express')
const router = express.Router()
const authController =require('./controllers/authController.js')
const userController =require('./controllers/userController.js')

// auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// user routes
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.get('/user/:id', userController.getUser);
router.post('/user/:id/follow', userController.follow);
router.post('/user/:id/unfollow', userController.unfollow);

module.exports = router