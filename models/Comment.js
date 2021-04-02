const pool = require("../db");
const Post = require("./Post");

const Comment = {};

Comment.getComments = async (postId) => {
  try {
    const res = await pool.query(
      "SELECT c.id, dateTime, userid, postid, content, username, profilephoto FROM comments c INNER JOIN users u ON c.userid = u.id WHERE postid = $1",
      [postId]
    );
    return res.rows;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

Comment.submit = async ({ postId, userId, content }) => {
  try {
    const res = await pool.query(
      "INSERT INTO comments (dateTime, userId, postId, content) VALUES (to_timestamp($1), $2, $3, $4) RETURNING *",
      [Date.now() / 1000.0, userId, postId, content]
    );
    const status = await Post.updateNumOfComments({
      change: 1,
      postId: postId,
    });
    return { status, comment: res.rows[0] };
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

Comment.delete = async ({ postId, commentId }) => {
  try {
    await pool.query("DELETE FROM comments WHERE id = $1", [commentId]);
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

//Voting

Comment.checkVoteStatus = async (data) => {
  const { userId } = data.params;
  const { commentId } = data.body;
  try {
    const res = await pool.query(
      "SELECT * FROM likes WHERE userId = $1 AND commentId = $2",
      [userId, commentId]
    );
    if (res.rows[0] == undefined) {
      return 0;
    }
    return res.rows[0].val;
  } catch (err) {
    console.error(err.message);
  }
};

Comment.changeNumOfLikes = async (data) => {
  const voteOperation = data.voteOperation;
  const voteStatus = data.voteStatus;
  const { commentId } = data.body;
  let change;
  if (voteOperation === "upVote") {
    switch (voteStatus) {
      case 0:
        // no vote -> upVote
        change = 1;
        break;
      case 1:
        // upVote -> cancel
        change = -1;
        break;
      case -1:
        // downVote -> upVote
        change = 2;
        break;
    }
  } else {
    switch (voteStatus) {
      case 0:
        // no vote -> downVote
        change = -1;
        break;
      case 1:
        // upVote -> downVote
        change = -2;
        break;
      case -1:
        // downVote -> cancel
        change = 1;
        break;
    }
  }
  const res = await pool.query(
    "UPDATE posts SET numOfLikes = numOfLikes + $1 WHERE id = $2 RETURNING numOfLikes",
    [change, commentId]
  );
  return res.rows[0];
};

Comment.upVote = async (data) => {
  const { userId } = data.params;
  const { commentId } = data.body;
  try {
    const res = await pool.query(
      "INSERT INTO likes (userid, commentId, val) VALUES ($1, $2, $3) RETURNING *",
      [userId, commentId, 1]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Comment.downVote = async (data) => {
  const { userId } = data.params;
  const { commentId } = data.body;
  try {
    const res = await pool.query(
      "INSERT INTO likes (userid, commentId, val) VALUES ($1, $2, $3) RETURNING *",
      [userId, commentId, -1]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Comment.cancelVote = async (data) => {
  const { userId } = data.params;
  const { commentId } = data.body;
  try {
    const res = await pool.query(
      "DELETE FROM likes WHERE userid=($1) AND commentId=($2)",
      [userId, commentId]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};
module.exports = Comment;
