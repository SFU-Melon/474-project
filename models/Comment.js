const pool = require('../db');
const Post = require('./Post');

const Comment = {};

Comment.getComments = async (postId) => {
  try {
    const res = await pool.query('SELECT * FROM comments WHERE postId = $1', [
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
      'INSERT INTO comments (dateTime, userId, postId, content) VALUES (to_timestamp($1), $2, $3, $4)',
      [Date.now() / 1000.0, userId, postId, content]
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

Comment.delete = async ({ postId, commentId }) => {
  try {
    await pool.query('DELETE FROM comments WHERE id = $1', [commentId]);
    const status = await Post.updateNumOfComments({
      change: -1,
      postId,
    });
    return status;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

module.exports = Comment;
