import React, { Fragment, useState } from "react";
import axios from 'axios';
import { useUserContext } from "../../contexts/UserContext";
import { Link } from 'react-router-dom'
import { Modal } from 'react-responsive-modal';
import SearchInputLocation from './SearchInputLocation'
import 'react-responsive-modal/styles.css'
import './style.css'

const CreatePost = () =>{
  
    const { user } = useUserContext();
    const [fileType, setFileType] = useState("");   
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const MIN_INPUT_LENGTH = 5;
    let imgUrl = ""; // setImgUrl/useState wont work for some reason

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
    const sendToDatabase = () => {
      console.log("submitting post");
      console.log(imgUrl);
      try{
          axios
            .post(`/api/createPost/${user.id}`, 
              { title : title,
                content : description, 
                location: location, 
                imageUrl : imgUrl })
            .then((res) => {
              setTitle("");
              setDescription("");
              setLocation("");
              setFile(null);
              setFileType("");
              imgUrl = "";
              console.log(res);
            });
      } catch (err) {
          console.error(err.message);
      }
    };

    // Upload image to S3 bucket
    const handleUpload = async (e) => {
      e.preventDefault();
      if(validateForm()){
        console.log("handling the upload");
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
              console.log("Successfully uploaded.");
              imgUrl = res_url;
              sendToDatabase();
              onCloseModal();
            }
          } catch (err) {
            console.log(err.message);
          }
        } else{
          sendToDatabase();
          onCloseModal();
        }
      }
    };
    
    // Validate the form 
    const validateForm = () => {
      if(title){
        if(title.length < 5) {
          setErrorMessage("Title must be at least 5 characters.");
          return false;
        } else {
          setErrorMessage("");
          return true
        }
      }
      return false;
    };

    return (
      <Fragment>
        {/* Modal Trigger */}
        {user ? (
        <button type="button" className="btn btn-primary" 
          onClick={onOpenModal}>
          Create Post
        </button>
        ) : (
        <Link to= "/login">
          <button type="button" className="btn btn-primary"> 
            Create Post 
          </button>
        </Link>
        )}

        {/* Modal */}
        <Modal className="custom-modal" open={open} 
          onClose={onCloseModal} center
          classNames={{
            overlay: 'customOverlay',
            modal: 'customModal',
          }}>
          <div>
            <h3 id="ModalTitle">Create Post</h3>
            <div>
              <form onSubmit={handleUpload}>
                  <div className="mb-2">
                    <p className ="control" style={{ color: "red" }}>{errorMessage}</p>
                    <h6>Title</h6>
                    <input 
                        type="text"
                        className = "form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)}/>
                  </div>
                  <div className="mb-2">
                    <h6>Description</h6>
                    <textarea 
                        type="text"
                        className = "form-control"
                        rows="10"
                        value={description}
                        onChange={e => setDescription(e.target.value)}/>
                  </div>
                  <div className="mb-2">
                    <h6>Location</h6>
                    <SearchInputLocation setLocation={setLocation}/>
                  </div>
                  <div className="mb-3">
                  <h6>Image</h6>
                    <input
                        type="file"
                        name="file"
                        className = "form-control"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleChange}
                    />
                  </div>
                  <button type="submit" 
                    className="btn btn-success form-control">
                    Submit
                  </button>
              </form>
            </div>
          </div>
        </Modal>
      </Fragment>);
};

export default CreatePost;