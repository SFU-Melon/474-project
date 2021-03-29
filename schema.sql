CREATE DATABASE db354;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    fname VARCHAR(200) NOT NULL,
    lname VARCHAR(200) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(200) NOT NULL,
    joindate TIMESTAMP NOT NULL,
    profilephoto VARCHAR(200),
    UNIQUE (username)
);

CREATE TABLE plants(
    id SERIAL PRIMARY KEY,
    sciname varchar(100) NOT NULL,
    comname varchar(100) NOT NULL,
    description TEXT NOT NULL,
    plantinstr TEXT,
    growinstr TEXT,
    careinstr TEXT,
    plantphoto VARCHAR(200),
    UNIQUE (sciname)
);

CREATE TABLE posts(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    sortingid SERIAL,
    dateTime TIMESTAMP NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    location VARCHAR(200),
    imageurl VARCHAR(200),
    numoflikes INTEGER DEFAULT 0 NOT NULL,
    numofcomments INTEGER DEFAULT 0 NOT NULL,
    authorname VARCHAR(200),
    userid uuid references users(id)
        ON DELETE CASCADE
);

CREATE TABLE likes(
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    val INTEGER,
    PRIMARY KEY(userId, postId)
);

CREATE TABLE followers(
    user1 uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    user2 uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE comments(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    dateTime TIMESTAMP NOT NULL,
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    content TEXT
);

CREATE TABLE outdoor(
    id SERIAL NOT NULL REFERENCES plants (id) ON DELETE CASCADE,
    outdoorclimate DECIMAL,
    PRIMARY KEY(id)
);

CREATE TABLE indoor(
    id SERIAL NOT NULL REFERENCES plants (id) ON DELETE CASCADE,   
    temperature DECIMAL,
    humidity DECIMAL,
    PRIMARY KEY(id)
);

CREATE TABLE plantdiseases(
    id SERIAL,
    name VARCHAR(100),
    plantid SERIAL NOT NULL REFERENCES plants (id) ON DELETE CASCADE,   
    description TEXT,
    PRIMARY KEY(id, plantid)
);

CREATE TABLE tagged(
    tagid SERIAL REFERENCES tags(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    PRIMARY KEY(tagid, postid, userid)
);

CREATE TABLE tags(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL UNIQUE
); 

CREATE TABLE saves(
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    PRIMARY KEY(userId, postId)
);

ALTER TABLE posts
  ADD COLUMN document_with_weights tsvector;
update posts
set document_with_weights = setweight(to_tsvector(title), 'A') ||
  setweight(to_tsvector(coalesce(authorname, '')), 'B') ||
    setweight(to_tsvector(coalesce(content, '')), 'C') ||
    setweight(to_tsvector(coalesce(location, '')), 'D');
CREATE INDEX post_document_idx
  ON posts
  USING GIN (document_with_weights);


ALTER TABLE users
  ADD COLUMN document_with_weights tsvector;
update users
set document_with_weights = setweight(to_tsvector(username), 'A') ||
  setweight(to_tsvector(coalesce(fname, '')), 'B') ||
    setweight(to_tsvector(coalesce(lname, '')), 'B');
CREATE INDEX user_document_idx
  ON users
  USING GIN (document_with_weights);


ALTER TABLE plants
  ADD COLUMN document_with_weights tsvector;
update plants
set document_with_weights = setweight(to_tsvector(sciname), 'A') ||
  setweight(to_tsvector(comname), 'B') ||
    setweight(to_tsvector(description), 'C');
CREATE INDEX plant_document_idx
  ON plants
  USING GIN (document_with_weights);


CREATE FUNCTION post_tsvector_trigger() RETURNS trigger AS $$
begin
  NEW.document_with_weights :=
  setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A')
  || setweight(to_tsvector('english', coalesce(NEW.authorname, '')), 'B')
  || setweight(to_tsvector('english', coalesce(NEW.content, '')), 'C')
  || setweight(to_tsvector('english', coalesce(NEW.location, '')), 'D');
  return NEW;
end
$$ LANGUAGE plpgsql;
CREATE TRIGGER post_tsvector_update BEFORE INSERT OR UPDATE
    ON posts FOR EACH ROW EXECUTE PROCEDURE post_tsvector_trigger();


CREATE FUNCTION user_tsvector_trigger() RETURNS trigger AS $$
begin
  NEW.document_with_weights :=
  setweight(to_tsvector('english', coalesce(NEW.username, '')), 'A')
  || setweight(to_tsvector('english', coalesce(NEW.fname, '')), 'B')
  || setweight(to_tsvector('english', coalesce(NEW.lname, '')), 'B');
  return NEW;
end
$$ LANGUAGE plpgsql;
CREATE TRIGGER user_tsvector_update BEFORE INSERT OR UPDATE
    ON users FOR EACH ROW EXECUTE PROCEDURE user_tsvector_trigger();


CREATE FUNCTION plant_tsvector_trigger() RETURNS trigger AS $$
begin
  NEW.document_with_weights :=
  setweight(to_tsvector('english', coalesce(NEW.sciname, '')), 'A')
  || setweight(to_tsvector('english', coalesce(NEW.comname, '')), 'B')
  || setweight(to_tsvector('english', coalesce(NEW.description, '')), 'C');
  return NEW;
end
$$ LANGUAGE plpgsql;
CREATE TRIGGER plant_tsvector_update BEFORE INSERT OR UPDATE
    ON plants FOR EACH ROW EXECUTE PROCEDURE plant_tsvector_trigger();
