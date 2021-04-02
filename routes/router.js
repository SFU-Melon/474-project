const router = require("express").Router();
const userController = require("../controllers/UserController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const plantController = require("../controllers/plantController");
const searchController = require("../controllers/searchController");
const { ensureAuthenticated } = require("./middlewares");

/******  Auth Routes ********/
router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/user", ensureAuthenticated, userController.getAuthUser);
router.get("/logout", userController.logout);

/******  Following Routes ********/
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUserById/:id", userController.getUserById);
router.get("/getUserByUsername/:username", userController.getUserByUsername);
router.get(
  "/getFollowersAndFollowing/:userId",
  userController.getFollowersAndFollowing
);
router.get(
  "/getFollowersAndFollowingUsers/:userId",
  userController.getFollowersAndFollowingUsers
);
router.post("/follows", userController.follows);
router.post("/unfollows", userController.unfollows);

/******  User Edit Routes ********/
router.post(
  "/editProfilePhoto/:userId",
  ensureAuthenticated,
  userController.editProfilePhoto
);

router.post(
  "/editProfileInfo/:userId",
  ensureAuthenticated,
  userController.editProfileInfo
);

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

router.get("/getPostLikedNotOwned/:id", postController.getPostLikedNotOwned);
router.get(
  "/getPost/:id",
  postController.checkSaveStatus,
  postController.getPostById
);
router.get("/getAllPosts", postController.getAllPosts);
router.get("/getAllPosts/:userId", postController.getAllPostsFromUserId);
router.delete(
  "/deletePost/:id",
  ensureAuthenticated,
  postController.deletePost
);
router.get("/savePost/:id", postController.savePost);
router.get("/unsavePost/:id", postController.unsavePost);
router.get(
  "/getAllSavedPosts",
  ensureAuthenticated,
  postController.getAllSavedPost
);

/****** Comment Routes ********/
router.get("/getComments/:postId", commentController.getComments);
router.post(
  "/submitComment/:userId/:postId",
  ensureAuthenticated,
  commentController.submitComment
);
router.delete(
  "/deleteComment/:postId/:commentId",
  ensureAuthenticated,
  commentController.deleteComment
);

/****** Plant Routes ********/
router.get("/getAllPlants", plantController.getAllPlants);
router.get("/getPlant/:id", plantController.getPlantById);

/****** Search Routes ********/
router.get("/search/posts/:value", searchController.searchPosts);
router.get("/search/plants/:value", searchController.searchPlants);
router.get("/search/users/:value", searchController.searchUsers);
router.get("/search/all/:value", searchController.searchAll);

module.exports = router;
