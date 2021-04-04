import React, { Fragment, useState } from "react";
import axios from "axios";
import { useUserContext } from "@contexts/UserContext";
import { Link } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import SearchInputLocation from "./SearchInputLocation";
import "react-responsive-modal/styles.css";
import "./style.css";
import "@pathofdev/react-tag-input/build/index.css";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from 'semantic-ui-react';

const CreatePost = (props) => {
  const { user } = useUserContext();
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tags, setTags] = useState([]);
  const TITLE_MIN_LENGTH = 5;
  
  // Placeholder ptions for tags
  const options  = [
    {key: 'firstpost', text: 'First Post', value: 'First Post'},
    {key: 'question', text: 'Question', value: 'Question'},
    {key: 'help', text: 'Help', value: 'Help'},
    {key: 'tips', text: 'Tips', value: 'Tips'},
    {key: 'suggestion', text: 'Suggestion', value: 'Suggestion'},
  ]

  // Handle change of tags
  const handleTags = (e, {value}) => {
    setTags(value);
  }

  // Handling modal open/close
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // Handle change of target file
  const handleChange = (e) => {
    if (e.target.files[0]) {
      const parts = e.target.files[0].name.split(".");
      const type = parts[parts.length - 1];
      setFile(e.target.files[0]);
      setFileType(type);
    }
  };

  // Send post data to database
  const sendToDatabase = (imgUrl) => {
    try {
      axios
        .post(`/api/createPost/${user.id}`, {
          title: title,
          content: description,
          location: location,
          imageUrl: imgUrl,
          tags: tags,
        })
        .then((res) => {
          setTitle("");
          setDescription("");
          setLocation("");
          setFile(null);
          setFileType("");
          setTags([]);

          // Use res post id to insert uid, pid and tag array
          // to Post model -- then parse and enter each tag into
          // Tags and then use that tag id 
          console.log(res);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  // Handle upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (file) {
        try {
          let res;
          res = await axios.post("/api/postUpload", { fileType: fileType });
          if (res.data.success) {
            const signedRequest = res.data.signedRequest;
            const res_url = res.data.url;
            const options = {
              headers: {
                "Content-Type": fileType,
              },
            };
            //uploading to s3 bucket
            await axios.put(signedRequest, file, options);
            sendToDatabase(res_url);
            onCloseModal();
            setTimeout(() => window.location.reload(), 200);
          }
        } catch (err) {
          console.log(err.message);
        }
      } else {
        sendToDatabase();
        onCloseModal();
        setTimeout(() => window.location.reload(), 200);
      }
    }
  };

  // Validate the form
  const validateForm = () => {
    if (title) {
      if (title.length < TITLE_MIN_LENGTH) {
        setErrorMessage("Title must be at least 5 characters.");
        return false;
      } else {
        setErrorMessage("");
        return true;
      }
    }
    setErrorMessage("Please add a title to create a post.");
    return false;
  };

  return (
    <Fragment>
      {/* Modal Trigger */}
      {user ? (
        <button type="button" className="btn btn-primary" onClick={onOpenModal}>
          Create Post
        </button>
      ) : (
        <Link to="/login">
          <button type="button" className="btn btn-primary">
            Create Post
          </button>
        </Link>
      )}

      {/* Modal */}
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
          <h3 id="ModalTitle">Create Post</h3>
          <div>
            <form onSubmit={handleUpload}>
              <div className="mb-3">
                <p className="control" style={{ color: "red" }}>
                  {errorMessage}
                </p>
                <h6>Title</h6>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <h6>Tags</h6>
                <Dropdown placeholder="Select tags" 
                  fluid multiple selection options={options} onChange={handleTags}/>
              </div>
              <div className="mb-3">
                <h6>Description</h6>
                <textarea
                  type="text"
                  className="form-control"
                  rows="10"
                  wrap="hard" //needed for line breaks
                  placeholder="Enter a description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <h6>Image</h6>
                <input
                  type="file"
                  name="file"
                  className="form-control"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <h6>Location</h6>
                <SearchInputLocation setLocation={setLocation} />
              </div>
              <button type="submit" className="btn btn-success form-control">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default CreatePost;
