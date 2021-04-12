const router = require("express").Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const plantController = require("../controllers/plantController");
const diseaseController = require("../controllers/diseaseController");
const pestController = require("../controllers/pestController");
const searchController = require("../controllers/searchController");
const voteController = require("../controllers/voteController");
const { ensureAuthenticated, ensureAuthorized } = require("./middlewares");

/******  Auth Routes ********/
router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/user", ensureAuthenticated, userController.getAuthUser);
router.get("/logout", userController.logout);

/******  User Routes ********/
router.get("/getUserById/:id", userController.getUserById);
router.get("/getUserByUsername/:username", userController.getUserByUsername);
router.get("/userstats/:id", userController.getUserStats);
router.get(
  "/resetPasswordRequest/:username",
  userController.resetPasswordRequest
);
router.post(
  "/resetPassword/:username",
  ensureAuthorized,
  userController.resetPassword
);
router.get("/getTotalAmountOfUsers", userController.getTotalAmount);

/******  Following Routes ********/
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

/******  Vote Routes ********/
router.post(
  "/upVotePost/:userId",
  ensureAuthenticated,
  voteController.checkVoteStatus,
  voteController.upVote
);
router.post(
  "/downVotePost/:userId",
  ensureAuthenticated,
  voteController.checkVoteStatus,
  voteController.downVote
);

/******  Post Routes ********/
router.post(
  "/createPost/:userId",
  ensureAuthenticated,
  postController.createPost
);

router.get("/getPostLikedNotOwned/:id", postController.getPostLikedNotOwned);

router.get("/getPosts", postController.getPosts);
router.get(
  "/getPost/:id",
  postController.checkSaveStatus,
  postController.getPostById
);
router.get("/getAllPosts/:userId", postController.getAllPostsFromUserId);
router.delete(
  "/deletePost/:postId/:userId",
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

/******  Post Edit Routes ********/
router.post(
  "/editPost/:userId",
  ensureAuthenticated,
  postController.editPostById
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
router.get("/getPlant/:sciname", plantController.getPlantById);

/****** Plant Disease Routes ********/
router.get("/getDiseasesByPlantSciName/:sciname", diseaseController.getAllBySciName);

/****** Plant Pest Routes ********/
router.get("/getPestsByPlantSciName/:sciname", pestController.getAllBySciName);

/****** Search Routes ********/
router.get("/search/posts/:value", searchController.searchPosts);
router.get("/search/plants/:value", searchController.searchPlants);
router.get("/search/users/:value", searchController.searchUsers);
router.get("/search/all/:value", searchController.searchAll);

module.exports = router;
