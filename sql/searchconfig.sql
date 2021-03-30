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
