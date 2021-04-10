import { useLocation } from "react-router-dom";
import CreatePost from "./CreatePost";
import AllUsers from "./AllUsers";
import SearchFilter from "@components/SearchFilter";
import { useState } from "react";
import PostsList from "./PostsList";

const Home = () => {
  const [tags, setTags] = useState([]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row m-1 mt-3">
          <div className="col col-lg-9 ">
            <SearchFilter setTags={setTags} />
            <div className="d-flex justify-content-start m-2 mt-4">
              <CreatePost />
            </div>
            <PostsList tags={tags} />
          </div>
          <div className="d-none d-lg-block col">
            <AllUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
