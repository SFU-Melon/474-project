const Comment = require("../models/Comment");
const commentController = {};

commentController.getComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.getComments(postId);
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
    const status = await Comment.submit({ postId, userId, content });
    return res.json({
      success: status ? true : false,
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
    const id = req.params.id;
    const status = await Comment.delete(id);
    return res.json({
      success: status ? true : false,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
    });
  }
};

module.exports = commentController;
