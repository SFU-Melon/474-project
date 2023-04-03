import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import PostCard from "./PostCard";
import { useLocation } from "react-router-dom";

export default function PostsList({ tags }) {
  let filterType = useLocation().pathname.includes("new") ? "new" : "hot";
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPosts = useCallback(async()=> {
    try {
      const res = await axios.get("/post/api/getPosts", {
        params: {
          filterType,
          tags // :tags.map(tag => encodeURIComponent(tag)) Might need this?
        },
      });
      
      if(res.status === 200){ 
        console.log("WHY IS THIS NOT WORKING")
        setPosts(res.data);
      }
      setIsLoading(false);

    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(true);
    }
  }, [tags, filterType])

  useEffect(() => {
    fetchPosts();
  }, [filterType, tags]);


  return isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Server failed to retrieve posts</p>
  ) : (
    <div>
      {posts?.map((post, i) => 
          <PostCard key={post.id} post={post}></PostCard>
      )}
    </div>
  );
}
