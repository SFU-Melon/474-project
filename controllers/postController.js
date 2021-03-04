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

// postController.upVote = (req, res, next) => {};

// postController.downVote = (req, res, next) => {};

// postController.cancelVote = (req, res, next) => {};

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

// postController.deletePost = (req, res, next) => {};

module.exports = postController;
