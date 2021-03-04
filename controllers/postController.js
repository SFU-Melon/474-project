const Post = require('../models/Post');
const postController = {};

postController.createPost = async (req, res, next) => {
  console.log('Inside postController');
  try {
    const newPost = await Post.create(req);
    return res.json(newPost);
  } catch (err) {
    console.error(err.message);
  }
};

// postController.upVote = (req, res, next) => {};

// postController.downVote = (req, res, next) => {};

// postController.cancelVote = (req, res, next) => {};

// postController.getPost = (req, res, next) => {};

// postController.getAllPosts = (req, res, next) => {};

// postController.getUserPosts = (req, res, next) => {};

// postController.deletePost = (req, res, next) => {};

module.exports = postController;
