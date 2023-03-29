import React, { useState } from "react";
import { useUserContext } from "@contexts/UserContext";
import { Link } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import SearchInputLocation from "@components/SearchInputLocation";
import "react-responsive-modal/styles.css";
import "./style.css";
import "@pathofdev/react-tag-input/build/index.css";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
import Utility from "@utils";
import {axiosApiInstance} from "../../utils/axiosConfig";

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
  const options = Utility.tags;

  // Handle change of tags
  const handleTags = (e, { value }) => {
    setTags(value);
  };

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
      axiosApiInstance
        .post(`/post/api/createPost`, {
          title: title,
          userId: user.id,
          content: description,
          location: location,
          imageurl: imgUrl ?? "",
          authorname: user.id, // Might be redundant
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
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  // Handle upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (validatePost()) {
      if (file) {
        try {
          let res;
          res = await axiosApiInstance.post("/image/api/postUpload", { fileType: fileType });
          if (res.data.success) {
            const signedRequest = res.data.signedRequest;
            const res_url = res.data.url;
            const options = {
              headers: {
                "Content-Type": fileType,
              },
            };
            //uploading to s3 bucket
            await axiosApiInstance.put(signedRequest, file, options);
            sendToDatabase(res_url);
            onCloseModal();
            setTimeout(() => window.location.reload(), 400);
          }
        } catch (err) {
          console.log(err.message);
        }
      } else {
        sendToDatabase();
        onCloseModal();
        setTimeout(() => window.location.reload(), 400);
      }
    }
  };

  // Validate the post
  const validatePost = () => {
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
    <div className="custom">
      {/* Modal Trigger */}
      {user ? (
        <button type="button" className="btn btn-success" onClick={onOpenModal}>
          Create Post
        </button>
      ) : (
        <Link to="/login">
          <button type="button" className="btn btn-success">
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
                <Dropdown
                  placeholder="Select tags"
                  fluid
                  multiple
                  selection
                  options={options}
                  onChange={handleTags}
                />
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
    </div>
  );
};

export default CreatePost;
