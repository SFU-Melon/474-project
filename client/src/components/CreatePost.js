import React, { Fragment, useState } from "react";
import axios from 'axios';

const CreatePost = ({ user }) =>{

    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [imgUrl, setImgUrl] = useState(null);

    const [fileType, setFileType] = useState("");   
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
          const parts = e.target.files[0].name.split(".");
          const type = parts[parts.length - 1];
          setFile(e.target.files[0]);
          setFileType(type);
        }
    };

    const handleUpload = async (e) => {
      e.preventDefault();
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
            submitForm(e);
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    };

    const submitForm = async e => {
        e.preventDefault(); // prevents default refresh
        try{
            console.log("submitting post");
            axios
              .post(`/api/createPost/${user.id}`, {content : description, location: location, imageUrl : imgUrl})
              .then((res) => {
                console.log(res);
              });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
        {/* Modal Trigger */}
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#creatPost">
        Create Post
        </button>

        {/* Modal */}
        <div className="modal fade" id="creatPost" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Create Post</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <form onSubmit={handleUpload}>
                          <h5>Description</h5>
                          <input 
                              type="text"
                              className = "form-control"
                              value={description}
                              onChange={e => setDescription(e.target.value)}/>
                          <h5>Location</h5>
                          <input 
                              type="text"
                              className = "form-control"
                              value={location}
                              onChange={e => setLocation(e.target.value)}/>
                          <h5>Images</h5>
                          <input
                              type="file"
                              name="file"
                              accept=".jpg,.jpeg,.png"
                              onChange={handleChange}
                          />
                          <br />
                          <button type="submit" className="btn btn-success float-right">Submit</button>
                      </form>
                  </div>
                </div>
            </div>
        </div>
        </Fragment>);
};

export default CreatePost;