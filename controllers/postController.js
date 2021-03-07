const Post = require('../models/Post');
const postController = {};

postController.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req);
    console.log(newPost);
    return res.json(newPost);
  } catch (err) {
    console.error(err.message);
  }
};

postController.upVote = async (req, res) => {
  try {
    const cancelPrempt = await Post.cancelVote(req);
    const newLike = await Post.upVote(req);
    return res.json(newLike);
  } catch (err) {
    console.err(err.message);
  }
};

postController.downVote = async (req, res) => {
  try {
    const cancelPrempt = await Post.cancelVote(req);
    const newDislike = await Post.downVote(req);
    return res.json(newDislike);
  } catch (err) {
    console.err(err.message);
  }
};

postController.cancelVote = async (req, res) => {
  try {
    const canceledVote = await Post.cancelVote(req);
    return res.json(canceledVote);
  } catch (err) {
    console.err(err.message);
  }
};

postController.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.getPostById(id);
    return res.json(post);
  } catch (err) {
    console.error(err.message);
  }
};

//NEED to know how to paginate data
postController.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.getAllPosts();
    return res.json(allPosts);
  } catch (err) {
    console.error(err.message);
  }
};

postController.getAllPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.getAllPostsByUserId(userId);
    return res.json(posts);
  } catch (err) {
    console.error(err.message);
  }
};

postController.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.delete(id);
    return res.json(`post ${id} is deleted`);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = postController;
