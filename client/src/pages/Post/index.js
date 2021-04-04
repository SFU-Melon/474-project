import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Utility from "../../utils";
import { useUserContext } from "@contexts/UserContext";
import { useHistory } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import EditPost from "./EditPost";
import { Label } from 'semantic-ui-react'

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
  const [tags, setTags] = useState([]);
  let history = useHistory();

  const [openDelete, setOpenDelete] = useState(false);
  const onOpenModalDelete = () => setOpenDelete(true);
  const onCloseModalDelete = () => setOpenDelete(false);

  const fetchPost = async () => {
    const res = await axios.get(`/api/getPost/${decoded}`);
    setPost(res.data);
    setSaveClicked(res.data.saveStatus);
    setTags(res.data.tags);
  };

  useEffect(() => {
    fetchPost();
    setTags(post?.tags);
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
      if (decoded && user?.id) {
        const res = await axios.delete(`/api/deletePost/${decoded}/${user?.id}`)
        if (res.data.success) {
          history.push("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  const getColor = (tagName) => {
    if (tagName == 'First Post') return 'blue';
    if (tagName == 'Question') return 'red';
    if (tagName == 'Suggestion') return 'teal';
    if (tagName == 'Help') return 'yellow';
    if (tagName == 'Tip') return '';
    return '';
  }

  return (
    <Fragment>
      {post && (
        <div className="container">
          <div className="card mt-5">
            <div className="post d-flex flex-row p-5">
              <div>
                <Vote
                  postId={post.id}
                  numOfLikes={post.numoflikes}
                  preVoteStatus={post.val}
                />
              </div>
              <div className="mx-4">
                <h1>{post.title}</h1>
                <div className="d-flex flex-row mb-3 align-items-start">
                  <h4 className ="me-2">{tags ? "Tags: " : ""}</h4>
                  { tags ? 
                  (
                    tags.map((item, i) => (
                      <Label as='a' color={`${getColor(item)}`} >
                        {item}
                      </Label>
                    ))
                  )
                  :(<div></div>) }
                </div>
                <div className="mb-2">
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
                      className="mt-4"
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
                    <button className="btn btn-danger btn-sm me-1" onClick={onOpenModalDelete}>
                      Delete
                    </button>
                  )}
                  <EditPost post={post}/>
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

      {/* Delete Modal */}
      <Modal
        className="custom-modal"
        open={openDelete}
        onClose={onCloseModalDelete}
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
                onClick={onCloseModalDelete}
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
