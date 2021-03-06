const router = require('express').Router();
const userController = require('../controllers/UserController');
const postController = require('../controllers/postController');
const { ensureAuthenticated } = require('./middlewares');

/******  Auth Routes ********/
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/user', ensureAuthenticated, userController.getAuthUser);
router.get('/logout', userController.logout);

/******  Post Routes ********/
router.post('/createPost/:userId', postController.createPost);
router.post('/upVotePost/:userId', postController.upVote);
router.post('/downVotePost/:userId', postController.downVote);
router.post('/cancelVotePost/:userId', postController.cancelVote);
// router.get('/getPost/:id', postController.getPost);
// router.get('/getAllPosts', postController.getAllPosts);
// router.get('/getAllPosts/:userId', postController.getUserPosts);
// router.delete('/deletePost/:id', postController.deletePost);


module.exports = router;
