const pool = require('../db');

const Post = {};

Post.create = async (data) => {
  const { dateTime, location, imageUrl, content } = data.body;
  const { userId } = data.params;
  try {
    const res = await pool.query(
      'INSERT INTO posts (dateTime, location, imageUrl, userId, content) VALUES (to_timestamp($1),$2,$3,$4,$5) RETURNING *',
      [(Date.now()/1000.0), location, imageUrl, userId, content]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Post.getAllPosts = async () => {
  try {
    const res = await pool.query('SELECT * FROM posts');
    console.log(res, 'all posts');
    return res.rows;
  } catch (err) {
    console.error(err.message);
  }
};

Post.getAllPostsByUserId = async (userId) => {
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

Post.upVote = async (data) => {
  const { userId } = data.params;
  const { postId } = data.body;
  console.log(userId, 'userId');
  console.log(postId, 'postId');
  try {
    const res = await pool.query(
      'INSERT INTO likes (userid, postid, val) VALUES ($1, $2, $3) RETURNING *',
      [userId, postId, 1]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Post.downVote = async (data) => {
  const { userId } = data.params;
  const { postId } = data.body;
  console.log(userId, 'userId');
  console.log(postId, 'postId');
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
  console.log(userId, 'userId');
  console.log(postId, 'postId');
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
