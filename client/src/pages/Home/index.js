import { useLocation } from "react-router-dom";
import NewPosts from "./NewPosts";
import PopularPosts from "./PopularPosts";
import CreatePost from "./CreatePost";
import AllUsers from "./AllUsers";
import SearchFilter from "@components/SearchFilter";

const Home = () => {
  let filterType = useLocation().pathname.includes("new") ? "new" : "hot";
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-10">
            <SearchFilter />
            <div className="d-flex justify-content-start m-2 mt-4">
              <CreatePost />
            </div>
            {filterType === "hot" ? <PopularPosts /> : <NewPosts />}
          </div>
          <div className="col col-md-auto">
            <AllUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
