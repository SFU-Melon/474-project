const Comment = require('../models/Comment');
const commentController = {};

commentController.getComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user?.id;
    const ids = { userId, postId };
    const comments = await Comment.getComments(ids);
    return res.json({
      success: true,
      comments,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
    });
  }
};

commentController.submitComment = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const { content } = req.body;
    const { status, comment } = await Comment.submit({
      postId,
      userId,
      content,
    });
    return res.json({
      success: status ? true : false,
      comment,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
    });
  }
};

commentController.deleteComment = async (req, res) => {
  try {
    const ids = req.params;
    const status = await Comment.delete(ids);
    return res.json({
      success: status ? true : false,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
    });
  }
};

module.exports = commentController;
