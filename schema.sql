CREATE DATABASE db354;

/* Run this before creating the table */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    fName VARCHAR(200) NOT NULL,
    lName VARCHAR(200) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(200) NOT NULL,
    profilephoto BYTEA,
    UNIQUE (id, username)
);


/* change db's */
\c db354

/*** For testing ***/
/* Drop table */
DROP TABLE users;
/* Delete all rows inside users table */
DELETE FROM users;
/* See all rows inside users table */
SELECT * FROM users;
/* Insert user into users */
INSERT INTO users VALUES (uuid_generate_v4(), 'artunzPlantz', 'password123', 'Artun', 'Cimensel', '1992-12-22', 'artunsfakeemail@gmail.com', NULL);
