const pool = require('../db');

const Post = {};

Post.create = async (data) => {
  const {
    dateTime,
    location,
    imageUrl,
    content,
    title,
    numOfLikes,
  } = data.body;
  const { userId } = data.params;
  try {
    const res = await pool.query(
      'INSERT INTO posts (dateTime, location, imageUrl, userId, content, title, numOfLikes) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [dateTime, location, imageUrl, userId, content, title, numOfLikes]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Post.getAllPosts = async () => {
  try {
    const res = await pool.query('SELECT * FROM posts');
    return res.rows;
  } catch (err) {
    console.error(err.message);
  }
};

Post.getAllPostsFromUserId = async (userId) => {
  try {
    const res = await pool.query('SELECT * FROM posts WHERE userId = $1', [
      userId,
    ]);
    return res.rows;
  } catch (err) {
    console.error(err.message);
  }
};

Post.getPostById = async (id) => {
  try {
    const res = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Post.checkVoteStatus = async (data) => {
  const { userId } = data.params;
  const { postId } = data.body;
  try {
    const res = await pool.query(
      'SELECT * FROM likes WHERE userId = $1 AND postId = $2',
      [userId, postId]
    );
    console.log(res.rows[0], 'res object in checkVoteStatus Post modal');
    if (res.rows[0] == undefined) {
      return 0;
    }
    return res.rows[0].val;
  } catch (err) {
    console.error(err.message);
  }
};

Post.changeNumOfLikes = async (data) => {
  const voteOperation = data.voteOperation;
  const voteStatus = data.voteStatus;
  const { postId } = data.body;
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
    'UPDATE posts SET numOfLikes = numOFLikes + $1 WHERE id = $2',
    [change, postId]
  );
};

Post.upVote = async (data) => {
  const { userId } = data.params;
  const { postId } = data.body;
  try {
    const res = await pool.query(
      'INSERT INTO likes (userid, postid, val) VALUES ($1, $2, $3) RETURNING *',
      [userId, postId, 1]
    );
    console.log(res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Post.downVote = async (data) => {
  const { userId } = data.params;
  const { postId } = data.body;
  try {
    const res = await pool.query(
      'INSERT INTO likes (userid, postid, val) VALUES ($1, $2, $3) RETURNING *',
      [userId, postId, -1]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Post.cancelVote = async (data) => {
  const { userId } = data.params;
  const { postId } = data.body;
  try {
    const res = await pool.query(
      'DELETE FROM likes WHERE userid=($1) AND postid=($2)',
      [userId, postId]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Post.delete = async (id) => {
  try {
    await pool.query('DELETE FROM posts WHERE id=$1', [id]);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = Post;
