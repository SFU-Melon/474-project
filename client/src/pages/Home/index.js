import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import { useEffect, useState, Fragment } from 'react';
import PostCard from '../../components/PostCard';
import CreatePost from './CreatePost';

export default function Home() {
  const id = 4;
  const { user } = useUserContext();

  const [allPosts, setAllPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      const res = await axios.get('/api/getAllPosts');
      if (res) {
        setAllPosts(res.data);
        // setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    console.log('useEffect in home');
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div className="d-flex justify-content-start m-2 mt-4">
          <CreatePost/>
        </div>
        {allPosts.map((post) => (
          <PostCard
            key={post.id}
            postId={post.id}
            content={post.content}
            title={post.title}
            numOfLikes={post.numOfLikes}
          ></PostCard>
        ))}
      </div>
    </Fragment>
  );
}
