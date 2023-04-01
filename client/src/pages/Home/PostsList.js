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
          tags,
        },
      });
      
      if(res.status === 200){ 
        setPosts(res.data);
      }
      setIsLoading(false);

    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(true);
    }
  }, [])

  useEffect(() => {
    fetchPosts();
  }, []);


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
