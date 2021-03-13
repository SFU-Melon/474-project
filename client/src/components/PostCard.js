import Vote from './Vote';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Utility from '../utils';

/***
 * props: {
    post,
 * }
 */

export default function PostCard({ post }) {
  const [displayTime, setDisplayTime] = useState('');
  const encoded = Utility.encodeUUID(post.id);
  const encodedTitle = encodeURIComponent(post.title);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const time = Utility.getDisplayTime(post.datetime);
    setDisplayTime(time);
  }, []);

  return (
    <div
      className="card flex-row p-3 m-2"
      style={hover ? { border: '1px solid black' } : {}}
    >
      <Vote
        postId={post.id}
        numOfLikes={post.numoflikes}
        preVoteStatus={post.val}
      />
      <div
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <Link
          to={`/post/${encodedTitle}/${encoded}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <h2>{post.title}</h2>

          <div>
            {post.imageurl && <img src={post.imageurl} className="post-card" />}
          </div>
          <p>{displayTime}</p>
          <div className="d-flex flex-row justify-content-between">
            <p>
              Posted by {post.authorname} (Author Name){' '}
              {post.location && 'from'} {post.location}
            </p>
          </div>
          <div>
            <h4>
              {post.numofcomments}
              {' comment(s)'}
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
