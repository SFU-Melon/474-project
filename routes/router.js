const router = require("express").Router();
const userController = require("../controllers/UserController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const { ensureAuthenticated } = require("./middlewares");

/******  Auth Routes ********/
router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/user", ensureAuthenticated, userController.getAuthUser);
router.get("/logout", userController.logout);

/******  Following Routes ********/
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getFollowersAndFollowing/:userId", userController.getFollowersAndFollowing);
router.post("/follows", userController.follows);
router.post("/unfollows", userController.unfollows);

/******  Post Routes ********/
router.post(
  "/createPost/:userId",
  ensureAuthenticated,
  postController.createPost
);
router.post(
  "/upVotePost/:userId",
  ensureAuthenticated,
  postController.checkVoteStatus,
  postController.upVote
);
router.post(
  "/downVotePost/:userId",
  ensureAuthenticated,
  postController.checkVoteStatus,
  postController.downVote
);

router.get("/getPost/:id", postController.getPostById);
router.get("/getAllPosts", postController.getAllPosts);
router.get("/getAllPosts/:userId", postController.getAllPostsFromUserId);
router.delete(
  "/deletePost/:id",
  ensureAuthenticated,
  postController.deletePost
);

/****** Comment Routes ********/
router.get(
  "/getComments/:postId",
  commentController.getComments
);
router.post(
  "/submitComment/:userId/:postId",
  ensureAuthenticated,
  commentController.submitComment
);
router.delete(
  "/deleteComment/:id",
  ensureAuthenticated,
  commentController.deleteComment
);

module.exports = router;
