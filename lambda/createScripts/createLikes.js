exports.handler = async (event, context, cb) => {
    const { Client } = require('pg');
    const client = new Client({
        user: process.env.user,
        host: process.env.write,
        database: process.env.database,
        password: process.env.password,
        port: process.env.port
    });
    await client.connect();
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await client.query(`CREATE TABLE likes(
      userid uuid,
      postid uuid REFERENCES posts(id)
          ON DELETE CASCADE,
      val INTEGER, /*Integer restrictued to 1, -1*/
      PRIMARY KEY(userid, postid)
  );`);
    // Your other interactions with RDS...
    client.end();
  };