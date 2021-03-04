const pool = require('../db');

const Post = {};

Post.create = async (data) => {
  const { dateTime, location, imageUrl, content } = data.body;
  const { userId } = data.params;

  try {
    const res = await pool.query(
      'INSERT INTO posts (dateTime, location, imageUrl, userId, content) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [dateTime, location, imageUrl, userId, content]
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

module.exports = Post;
