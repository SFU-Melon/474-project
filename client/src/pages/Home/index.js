import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import { useEffect, useState, Fragment } from 'react';
import PostCard from '../../components/PostCard';

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

  return (
    <Fragment>
      <div>
        <div className="container">
          {allPosts.map((post) => (
            <PostCard key={post.id} content={post.content}></PostCard>
          ))}
        </div>
        {/* <h1>Home</h1>
      {user && (
        <div>
          <h1>{user.username}</h1>
        </div>
      )} */}

        {/* <div className="testingCreatePost" style={{ flexDirection: 'row' }}>
        <input
          type="text"
          placeholder="content"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>CREATE POST</button>
      </div> */}
      </div>
    </Fragment>
  );
}
