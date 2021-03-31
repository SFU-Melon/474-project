import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Utility from "../../utils";
import { useUserContext } from "@contexts/UserContext";
import { useHistory } from "react-router-dom";
import { Modal } from "react-responsive-modal";

// Components
import Vote from "@components/Vote";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

const Post = () => {
  const [comments, setComments] = useState([]);
  const [saveClicked, setSaveClicked] = useState(false);
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { user } = useUserContext();
  const decoded = Utility.decodeUUID(id);
  let history = useHistory();

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

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

  const handleDelete = async () => {
    try {
      if (decoded) {
        const res = await axios.delete(`/api/deletePost/${decoded}`);
        if (res.data.success) {
          history.push("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

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
                  {post.content && (
                    <p
                      className="m-4"
                      style={{
                        whiteSpace:
                          "pre-wrap" /*** DO NOT DELETE THIS (NEEDED FOR LINE BREAKS) ***/,
                      }}
                    >
                      {post.content}
                    </p>
                  )}
                  {user && user.id !== post.userid && (
                    <button className="m-4" onClick={handleSave}>
                      {saveClicked ? "Saved!" : "Save"}
                    </button>
                  )}
                  {user && user.id === post.userid && (
                    <button className="m-4" onClick={onOpenModal}>
                      Delete
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

      <Modal
        className="custom-modal"
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
      >
        <div>
          <h3 id="ModalTitle">Are you sure?</h3>
          <div className="row">
            <div className="col">
              <button
                className="btn btn-danger form-control"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-secondary form-control"
                onClick={onCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Post;
