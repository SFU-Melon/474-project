import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import { useEffect, useState, Fragment } from 'react';
import PostCard from '../../components/PostCard';
import ImageUpload from '../../components/ImageUpload';
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
      <ImageUpload type={'test'} name={'test1'} />
      <div>
        <div className="container">
          {allPosts.map((post) => (
            <PostCard
              key={post.id}
              postId={post.id}
              content={post.content}
              title={post.title}
              numOfLikes={post.numoflikes}
              location={post.location}
              imgUrl={post.imageurl}
            ></PostCard>
          ))}
          {console.log(allPosts.map((post) => post))}
        </div>
        {/* <h1>Home</h1>
      {user && (
        <div>
          <h1>{user.username}</h1>
          <ImageUpload type={"post"} uploadCallback={uploadCallback} />
          {imgUrl && (
            <img src={imgUrl} alt="uploaded" width="700" height="700"></img>
          )}
        </div>
      )} */}

        <div className="testingCreatePost" style={{ flexDirection: 'row' }}>
          <input
            type="text"
            placeholder="content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button onClick={handleSubmit}>CREATE POST</button>
        </div>

        <AllUsers />
      </div>
    </Fragment>
  );
}
