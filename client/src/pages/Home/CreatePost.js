import React, { Fragment, useState } from "react";
import axios from 'axios';
import { useUserContext } from "../../contexts/UserContext";
import { Link } from 'react-router-dom'

const CreatePost = (props) =>{

    const { user } = useUserContext();
    const [fileType, setFileType] = useState("");   
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    let imgUrl = "";
    const [errorMessage, setErrorMessage] = useState("");

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
              console.log(res);
            });
      } catch (err) {
          console.error(err.message);
      }
    };

    // Upload image to S3 bucket
    const handleUpload = async (e) => {
      e.preventDefault();
      if(validForm()){
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
              // setImgUrl(`${res_url}`);
              sendToDatabase();
            }
          } catch (err) {
            console.log(err.message);
          }
        }
      }
    };

    const validForm = () => {
      if (title && description && location && file) {
        if (title.length < 5 || description.length < 5 
            || location.length < 5) {
          setErrorMessage(
            "Title, Description and Location must be longer than 5 characters."
          );
        } else {
          return true;
        }
      }
      return false;
    };

    // CreatePost modal component render
    return (
        <Fragment>
        {/* Modal Trigger */}
        {user ? (
        <button type="button" className="btn btn-primary" 
          data-bs-toggle="modal" 
          data-bs-target="#creatPost">
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
        <div className="modal fade" id="creatPost" tabIndex="-1" 
          aria-labelledby="exampleModalLabel" 
          aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title" 
                        id="exampleModalLabel">
                        Create Post
                      </h5>
                      <button type="button" 
                        className="btn-close" 
                        data-bs-dismiss="modal" 
                        aria-label="Close">
                      </button>
                  </div>
                  <div className="modal-body">
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
                            <input 
                                type="text"
                                className = "form-control"
                                value={location}
                                onChange={e => setLocation(e.target.value)}/>
                          </div>

                          <div className="mb-3">
                          <h6>Images</h6>
                            <input
                                type="file"
                                name="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleChange}
                            />
                          </div>
                          <button type="submit" 
                            className="btn btn-success text-right"
                            data-bs-dismiss="modal">
                            Submit
                          </button>
                      </form>
                  </div>
                </div>
            </div>
        </div>
        </Fragment>);
};

export default CreatePost;