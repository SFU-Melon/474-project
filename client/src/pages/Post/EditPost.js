import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "@contexts/UserContext";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Utility from "@utils";
import { Dropdown } from "semantic-ui-react";
import SearchInputLocation from "@components/SearchInputLocation";

const EditPost = (props) => {
  const { user } = useUserContext();

  // Edit post variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tags, setTags] = useState([]);
  const [postId, setPostId] = useState("");
  const TITLE_MIN_LENGTH = 5;
  const options = Utility.tags;

  const [open, setOpen] = useState(false);

  // Handling modal open/close
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // Handle user info fields
  const handleInfo = () => {
    setTitle(props.post ? props.post.title : "");
    setTags(props.post ? props.post.tags : []);
    setDescription(props.post ? props.post.content : "");
    setLocation(props.post ? props.post.location : "");
    setPostId(props.post ? props.post.id : "");
  };

  useEffect(() => {
    handleInfo();
  }, [user]);

  // Validate the post
  const validatePost = () => {
    if (
      title === props.post.title &&
      tags === props.post.tags &&
      description === props.post.content &&
      location === props.post.location
    ) {
      setErrorMessage("No changes have been made to the post");
      return false;
    }

    if (title) {
      if (title.length < TITLE_MIN_LENGTH) {
        setErrorMessage("Title must be at least 5 characters.");
        return false;
      } else {
        setErrorMessage("");
        return true;
      }
    } else {
      setErrorMessage("Please add a title to create a post.");
      return false;
    }
  };

  // Send new post data to database
  const editPost = () => {
    try {
      axios
        .post(`/post/api/editPost/${user.id}`, {
          title: title,
          content: description,
          location: location,
          tags: tags,
          postId: postId,
        })
        .then((res) => {
          console.log(res);
          setTimeout(() => window.location.reload(), 100);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (validatePost()) editPost();
  };

  const handleTags = (e, { value }) => {
    setTags(value);
  };

  return (
    <Fragment>
      {/* Modal Trigger */}
      {user ? (
        <button className="btn btn-warning btn-sm me-1" onClick={onOpenModal}>
          Edit Post
        </button>
      ) : (
        <div></div>
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
          <h3 id="ModalTitle">Edit Post</h3>
          <form onSubmit={handleEdit}>
            <div className="mb-3">
              <p className="control" style={{ color: "red" }}>
                {errorMessage}
              </p>
              <h6>Title</h6>
              <input
                type="text"
                className="form-control"
                placeholder="Edit title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <h6>Tags</h6>
              <Dropdown
                placeholder="Select tags"
                value={tags}
                fluid
                multiple
                selection
                options={options}
                onChange={handleTags}
              />
            </div>

            <div className="mb-3">
              <h6>Desciption</h6>
              <textarea
                type="text"
                className="form-control"
                rows="10"
                wrap="hard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <h6>Location</h6>
              <SearchInputLocation
                location={props.post.location}
                setLocation={setLocation}
              />
            </div>
            <button type="submit" className="btn btn-warning me-1">
              Edit
            </button>
            <button className="btn btn-secondary" onClick={onCloseModal}>
              Cancel
            </button>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
};

export default EditPost;
