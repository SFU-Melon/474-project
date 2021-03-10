import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import { useEffect, useState, Fragment } from 'react';
import PostCard from '../../components/PostCard';
import ImageUpload from '../../components/ImageUpload';
import CreatePost from './CreatePost';
import AllUsers from './AllUsers';

export default function Home() {
  const id = 4;
  const { user } = useUserContext();
  const [content, setContent] = useState('');

  // const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);

  const handleSubmit = () => {
    axios
      .post(`/api/createPost/${user.id}`, { content: content })
      .then((res) => {
        console.log(res);
      });
  };

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

  const [imgUrl, setImgUrl] = useState(null);

  const uploadCallback = (url) => {
    console.log(url);
    setImgUrl(url);
  };

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
