const pool = require('../db');
const Post = require('./Post');

const Comment = {};

Comment.getComments = async ({ userId, postId }) => {
  try {
    if (userId != undefined) {
      const res = await pool.query(
        'SELECT c.id, dateTime, c.userid, c.postid, content, username, profilephoto, c.numoflikes, l.val \
        FROM comments c \
        INNER JOIN users u ON c.userid = u.id \
        AND c.postid = $1 \
        LEFT JOIN likescomment l ON l.postid = c.postid AND l.commentid = c.id AND l.userid = $2\
        ORDER BY c.numoflikes DESC',
        [postId, userId]
      );
      return res.rows;
    }
    const res = await pool.query(
      'SELECT c.id, dateTime, userid, postid, content, username, profilephoto, c.numoflikes \
      FROM comments c \
      INNER JOIN users u ON c.userid = u.id \
      WHERE postid = $1\
      ORDER BY c.numoflikes DESC',
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
      'INSERT INTO comments (dateTime, userId, postId, content) VALUES (to_timestamp($1), $2, $3, $4) RETURNING *',
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

//Voting
Comment.checkVoteStatus = async (data) => {
  const { userId } = data.params;
  const {
    votedId: { commentId },
  } = data.body;
  try {
    const res = await pool.query(
      'SELECT * FROM likescomment WHERE userId = $1 AND commentId = $2',
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
  const {
    votedId: { commentId },
  } = data.body;
  let change;
  if (voteOperation === 'upVote') {
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
    'UPDATE comments SET numOfLikes = numOfLikes + $1 WHERE id = $2 RETURNING numOfLikes',
    [change, commentId]
  );
  return res.rows[0];
};

Comment.upVote = async (data) => {
  const { userId } = data.params;
  const {
    votedId: { commentId },
    votedId: { postId },
  } = data.body;
  try {
    const res = await pool.query(
      'INSERT INTO likescomment (userid, commentid, postid, val) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, commentId, postId, 1]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Comment.downVote = async (data) => {
  const { userId } = data.params;
  const {
    votedId: { commentId },
    votedId: { postId },
  } = data.body;
  try {
    const res = await pool.query(
      'INSERT INTO likescomment (userid, commentid, postid, val) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, commentId, postId, -1]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Comment.cancelVote = async (data) => {
  const { userId } = data.params;
  const {
    votedId: { commentId },
  } = data.body;
  try {
    const res = await pool.query(
      'DELETE FROM likescomment WHERE userid=($1) AND commentid=($2)',
      [userId, commentId]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};
module.exports = Comment;
