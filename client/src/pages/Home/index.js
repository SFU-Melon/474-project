import axios from "axios";
import { useUserContext } from "@contexts/UserContext";
import { useEffect, useState, Fragment } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import AllUsers from "./AllUsers";
import SearchFilter from "@components/SearchFilter";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  let location = useLocation();
  let filterType = useLocation().pathname.includes("new") ? "new" : "hot";
  const { user } = useUserContext();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  let lastPost;

  const fetchPostsForTheFirstTime = async () => {
    try {
      setHasMore(true);
      const res = await axios.get("/api/getPosts", {
        params: {
          filterType,
        },
      });
      if (res.data.length === 0) {
        setHasMore(false);
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMorePosts = async () => {
    try {
      const res = await axios.get("/api/getPosts", {
        params: {
          filterType,
          val: filterType === "hot" ? lastPost?.numoflikes : lastPost?.datetime,
          sortingId: lastPost?.sortingid,
        },
      });
      if (res.data.length === 0) {
        setHasMore(false);
      }
      //filtering out the same posts from prev posts in newPosts
      const newPosts = res.data.filter(
        (element) => !posts.map((post) => post.id).includes(element.id)
      );
      setPosts((prev) => [...prev, ...newPosts]);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchPostsForTheFirstTime().then((fetched_posts) => {
      if (isMounted) setPosts(fetched_posts);
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
              <div className="d-flex justify-content-start m-2 mt-4">
                <CreatePost />
              </div>
              {posts && (
                <InfiniteScroll
                  dataLength={posts.length}
                  pageStart={0}
                  next={fetchMorePosts}
                  hasMore={hasMore}
                  loader={
                    <div className="loader" key={0}>
                      Loading ...
                    </div>
                  }
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                >
                  {posts.map((post, index) => {
                    if (posts.length === index + 1) {
                      lastPost = post;
                    }
                    return <PostCard key={post.id} post={post}></PostCard>;
                  })}
                </InfiniteScroll>
              )}
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
