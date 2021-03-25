import axios from "axios";
import { useUserContext } from "@contexts/UserContext";
import { useEffect, useState, Fragment } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import AllUsers from "./AllUsers";
import SearchFilter from "@components/SearchFilter";
import { useLocation } from "react-router-dom";

export default function Home() {
  let location = useLocation();
  let filterType = useLocation().pathname.includes("new") ? "new" : "hot";
  const { user } = useUserContext();
  const [allPosts, setAllPosts] = useState([]);

  const fetchAllPosts = async (isMounted) => {
    try {
      const res = await axios.get("/api/getAllPosts", {
        params: {
          filterType,
        },
      });
      //setAllPosts(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchAllPosts().then((fetched_posts) => {
      if (isMounted) setAllPosts(fetched_posts);
    });
    return () => {
      isMounted = false;
    };
  }, [user, location]);

  return (
    <Fragment>
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-md-10">
              <SearchFilter />
              {console.log(location, "location in HOME")}
              <div className="d-flex justify-content-start m-2 mt-4">
                <CreatePost />
              </div>
              {allPosts.map((post) => (
                <PostCard key={post.id} post={post}></PostCard>
              ))}
            </div>
            <div className="col col-md-auto">
              <AllUsers />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
