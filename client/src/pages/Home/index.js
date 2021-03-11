import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import { useEffect, useState, Fragment } from 'react';
import PostCard from '../../components/PostCard';
import CreatePost from './CreatePost';

export default function Home() {

  const [allPosts, setAllPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      const res = await axios.get('/api/getAllPosts');
<<<<<<< HEAD
      if (res) {
        setAllPosts(res.data);
      }
=======

      setAllPosts(res.data);
>>>>>>> main
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    console.log('useEffect in home');
  }, [user]);

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
              voteStatus={post.val}
            ></PostCard>
          ))}
          {console.log(allPosts.map((post) => post))}
        </div>

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
