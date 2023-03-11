exports.handler = async (event, context, cb) => {
    const { Client } = require('pg');
    const client = new Client({
                     user: "postgres",
                     host: "user-profile.cnclnzrhebsa.us-east-2.rds.amazonaws.com",
                     database: "users",
                     password: "cmpt474dev",
                     port: 5432
                   });
    await client.connect();
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await client.query(`CREATE TABLE users(
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      username VARCHAR(200) NOT NULL,
      password VARCHAR(200) NOT NULL,
      fname VARCHAR(200) NOT NULL,
      lname VARCHAR(200) NOT NULL,
      dob DATE NOT NULL,
      email VARCHAR(200) NOT NULL,
      joindate TIMESTAMPTZ NOT NULL,
      profilephoto VARCHAR(200),
      UNIQUE (username)
  );`);
    // Your other interactions with RDS...
    client.end();
  };