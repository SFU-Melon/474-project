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
  await client.query(`CREATE TABLE posts(
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      sortingid SERIAL,
      dateTime TIMESTAMPTZ NOT NULL,
      title VARCHAR(200) NOT NULL,
      content TEXT,
      location VARCHAR(200),
      imageurl VARCHAR(200),
      numoflikes INTEGER DEFAULT 0 NOT NULL,
      numofcomments INTEGER DEFAULT 0 NOT NULL,
      authorname VARCHAR(200),
      tags TEXT[],
      userid uuid NOT NULL
  );`);
  // Your other interactions with RDS...
  client.end();
};