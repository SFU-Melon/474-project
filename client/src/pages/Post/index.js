import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Utility from "../../utils";
import { useUserContext } from "../../contexts/UserContext";

// Components
import Vote from "../../components/Vote";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

const Post = () => {
  const [comments, setComments] = useState([]);
  const [saveClicked, setSaveClicked] = useState(false);
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { user } = useUserContext();
  const decoded = Utility.decodeUUID(id);

  const fetchPost = async () => {
    const res = await axios.get(`/api/getPost/${decoded}`);
    setPost(res.data);
    setSaveClicked(res.data.saveStatus);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleSave = async () => {
    if (saveClicked) {
      const res = await axios.get(`/api/unsavePost/${decoded}`);
      if (res.data.success) {
        setSaveClicked(false);
      }
    } else {
      const res = await axios.get(`/api/savePost/${decoded}`);
      if (res.data.success) {
        setSaveClicked(true);
      }
    }
  };

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
                    <img
                      src={post.imageurl}
                      alt="plant in each post page"
                      className="plant-image"
                    />
                  )}
                </div>
                <div>
                  {post.content && <h3 className="m-4">{post.content}</h3>}
                  {user && (
                    <button className="m-4" onClick={handleSave}>
                      {saveClicked ? "Saved!" : "Save"}
                    </button>
                  )}
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
