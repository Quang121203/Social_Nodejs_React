const express = require('express')
const router = express.Router()

const authController = require('./controllers/authController.js')
const userController = require('./controllers/userController.js')
const postController = require('./controllers/postController.js')
const imgController = require('./controllers/imgController.js')
const conversationController = require('./controllers/conversationController.js')
const messageController = require('./controllers/messageController.js')

const middlewareToken = require('./middlewares/token.js')

// auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// user routes
router.put('/user/:id', middlewareToken.checkUser, userController.updateUser);
router.delete('/user/:id', middlewareToken.checkUser, userController.deleteUser);
router.get('/user/:id', middlewareToken.checkUser, userController.getUser);
router.get('/user/:username/find', middlewareToken.checkUser, userController.getUserByName);
router.get('/usercurrent', middlewareToken.checkUser, userController.getUserCurrent)

router.post('/user/:id/follow', middlewareToken.checkUser, userController.follow);
router.post('/user/:id/unfollow', middlewareToken.checkUser, userController.unfollow);

//post routes
router.post('/post', middlewareToken.checkUser, postController.createPost);
router.put('/post/:id', middlewareToken.checkUser, postController.updatePost);
router.delete('/post/:id', middlewareToken.checkUser, postController.deletePost);
router.post('/post/:id/like', middlewareToken.checkUser, postController.likePost);
router.get('/post/:id/timeline', middlewareToken.checkUser, postController.getPostTimeline);
router.get('/post/:id/', middlewareToken.checkUser, postController.getPost);

//images routes
router.post('/images', imgController.upload.single("file"), imgController.createImage);

//conversation routes
router.post('/conversation', middlewareToken.checkUser, conversationController.createConversation);
router.post('/conversation/find', middlewareToken.checkUser, conversationController.findConversation2User);
router.get('/conversation/:id/find', middlewareToken.checkUser, conversationController.findConversation1User);

//message routes
router.post('/message', middlewareToken.checkUser, messageController.createMessage);
router.get('/message/:id', middlewareToken.checkUser, messageController.getMessage);


module.exports = router