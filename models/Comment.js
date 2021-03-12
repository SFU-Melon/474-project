const pool = require("../db");
const Post = require("./Post");

const Comment = {};

Comment.getComments = async (postId) => {
  try {
    const res = await pool.query("SELECT * FROM comments WHERE postId = $1", [
      postId,
    ]);
    return res.rows;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

Comment.submit = async ({ postId, userId, content }) => {
  try {
    const res = await pool.query(
      "INSERT INTO comments (userId, postId, content) VALUES ($1, $2, $3)",
      [userId, postId, content]
    );
    const status = await Post.updateNumOfComments({
      change: 1,
      postId: postId,
    });
    return status;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

Comment.delete = async (id) => {
  try {
    await pool.query("DELETE FROM comments WHERE id = $1", [id]);
    const status = await Post.updateNumOfComments({
      change: -1,
      postId: postId,
    });
    return status;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

module.exports = Comment;
