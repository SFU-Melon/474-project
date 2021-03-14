import axios from "axios";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState, Fragment } from "react";
import PostCard from "../../components/PostCard";
import CreatePost from "./CreatePost";
import AllUsers from "./AllUsers";

export default function Home() {
  const { user } = useUserContext();
  const [allPosts, setAllPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      const res = await axios.get("/api/getAllPosts");
      setAllPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    console.log("useEffect in home");
  }, [user]);

  return (
    <Fragment>
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-md-10">
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
