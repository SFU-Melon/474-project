import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Utility from '../../utils';

// Components
import Vote from '../../components/Vote';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

const Post = () => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const decoded = Utility.decodeUUID(id);

  const fetchPost = async () => {
    const res = await axios.get(`/api/getPost/${decoded}`);
    setPost(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  // TODO: Work with voting
  return (
    <Fragment>
      {post && (
        <div className="container">
          <div className="card mt-4">
            <div className="post d-flex flex-row">
              <div className="mt-4">
                <Vote
                  postId={post.id}
                  numOfLikes={post.numoflikes}
                  preVoteStatus={post.val}
                />
              </div>
              <div>
                <h1 className="m-4">{post.title}</h1>
                <div>
                  {post.imageurl && (
                    <img src={post.imageurl} className="post-card" />
                  )}
                </div>
                <div>
                  {post.content && <h3 className="m-4">{post.content}</h3>}
                </div>
              </div>
            </div>
            <CommentInput postId={post.id} setComments={setComments} />
            <CommentList
              postId={post.id}
              comments={comments}
              setComments={setComments}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Post;
