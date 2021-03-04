const pool = require('../db');

const Post = {};

Post.create = async (data) => {
  const { dateTime, location, imageUrl, content } = data.body;
  const { userId } = data.params;
  console.log(userId, 'userId');
  try {
    const res = await pool.query(
      'INSERT INTO posts (dateTime, location, imageUrl, userId, content) VALUES ($1, $2,$3,$4,$5) RETURNING *',
      [dateTime, location, imageUrl, userId, content]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = Post;
