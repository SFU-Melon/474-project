const Post = require('../models/Post');
const postController = {};

postController.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req);
    return res.status(200).json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Creating post did not succeed' });
  }
};

postController.upVote = async (req, res) => {
  try {
    const cancelPrempt = await Post.cancelVote(req);
    const newLike = await Post.upVote(req);
    res.status(200).json({ message: 'Upvoted successfully!' });
  } catch (err) {
    console.err(err.message);
    res.status(500).json({ message: 'downVote did not succeed' });
  }
};

postController.downVote = async (req, res) => {
  try {
    const cancelPrempt = await Post.cancelVote(req);
    const newDislike = await Post.downVote(req);
    res.status(200).json({ message: 'downVoted successfully!' });
  } catch (err) {
    console.err(err.message);
    res.status(500).json({ message: 'downVote did not succeed' });
  }
};

postController.cancelVote = async (req, res) => {
  try {
    const canceledVote = await Post.cancelVote(req);
    res.status(200).json({ message: 'Cancelled vote successfully!' });
  } catch (err) {
    console.err(err.message);
    res.status(500).json({ message: 'CancelVote did not succeed' });
  }
};

postController.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.getPostById(id);
    res.json(post);
  } catch (err) {
    console.error(err.message);
  }
};

//NEED to know how to paginate data
postController.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.getAllPosts();
    res.json(allPosts);
  } catch (err) {
    console.error(err.message);
  }
};

postController.getAllPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.getAllPostsByUserId(userId);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
  }
};

postController.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.delete(id);
    res.json(`post ${id} is deleted`);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = postController;
