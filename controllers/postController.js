const Post = require("../models/Post");
const postController = {};

postController.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req);
    return res.status(200).json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Creating post did not succeed" });
  }
};

postController.getPostLikedNotOwned = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.getPostLikedNotOwned(id);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false });
  }
};

postController.editPostById = async (req, res) => {
  try {
    const editPost = await Post.editPostById(req);
    res.status(200).json({ message: "Edited post successfully!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Edit post did not succeed" });
  }
};

postController.getPostById = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const ids = { userId, postId: id };
    const post = await Post.getPostById(ids);
    if (userId) post.saveStatus = req.saveStatus;
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false });
  }
};

//NEED to know how to paginate data
postController.getPosts = async (req, res) => {
  try {
    const userId = req.user?.id;
    const {
      filterType,
      val = undefined,
      sortingId = undefined,
      tags = undefined,
    } = req.query;
    const data = { userId, filterType, val, sortingId, tags };
    const allPosts = await Post.getPosts(data);
    res.json(allPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false });
  }
};

postController.getAllPostsFromUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.getAllPostsFromUserId(userId);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false });
  }
};

postController.deletePost = async (req, res) => {
  try {
    await Post.delete(req);
    return res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false });
  }
};

postController.savePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const result = await Post.save(id, userId);
    return res.json({
      success: result,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false });
  }
};

postController.unsavePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const result = await Post.unsave(id, userId);
    return res.json({
      success: result,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false });
  }
};

postController.checkSaveStatus = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    if (userId) {
      const status = await Post.checkSaveStatus(id, userId);
      req.saveStatus = status;
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "checking save status failed" });
  }
};

postController.getAllSavedPost = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const posts = await Post.getAllSavedPosts(userId);
    return res.json({
      success: true,
      posts: posts,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "checking vote status failed" });
  }
};

module.exports = postController;
