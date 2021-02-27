CREATE DATABASE db354;

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    UNIQUE (email)
);


/*** For testing ***/

/* Delete all rows inside users table */
DELETE FROM users;
