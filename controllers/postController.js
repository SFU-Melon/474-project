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

postController.upVote = async (req, res, next) => {
  try{
    const cancelPrempt = await Post.cancelVote(req);
    const newLike = await Post.upVote(req);
    return res.json(newLike);
  } catch (err) {
    console.err(err.message);
  }
};

postController.downVote = async (req, res, next) => {
  try{
    const cancelPrempt = await Post.cancelVote(req);
    const newDislike = await Post.downVote(req);
    return res.json(newDislike);
  } catch (err) {
    console.err(err.message);
  }
};

postController.cancelVote = async (req, res, next) => {
  try{
    const canceledVote = await Post.cancelVote(req);
    return res.json(canceledVote);
  } catch (err) {
    console.err(err.message);
  }
};

// postController.getPost = (req, res, next) => {};

// postController.getAllPosts = (req, res, next) => {};

// postController.getUserPosts = (req, res, next) => {};

// postController.deletePost = (req, res, next) => {};

module.exports = postController;
