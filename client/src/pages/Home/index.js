import CreatePost from "./CreatePost";
import SearchFilter from "@components/SearchFilter";
import { useState } from "react";
import PostsList from "./PostsList";

const Home = () => {
  const [tags, setTags] = useState([]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-10">
            <SearchFilter setTags={setTags} />
            <div className="d-flex justify-content-start m-2 mt-4">
              <CreatePost />
            </div>
            <PostsList tags={tags} />
          </div>
          <div className="col col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
