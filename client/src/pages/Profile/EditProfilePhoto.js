import React, { Fragment, useState } from "react";
import { useUserContext } from "@contexts/UserContext";
import { Link } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./style.css";
import { axiosApiInstance } from "@utils/axiosConfig";
import { handleImageDelete, handleImageFileUpload, IMAGE_TYPE_PROFILE } from "@utils/imageService";

const EditProfilePhoto = (props) => {
  const { user } = useUserContext();
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handling modal open/close
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // Handle change of target file
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Send post data to database
  const sendToDatabase = (imgUrl) => {
    try {
      const url = user?.profilephoto;
      axiosApiInstance
        .post(`/user/api/editProfilePhoto/${user.id}`, {
          profilePhotoUrl: imgUrl,
        })
        .then((res) => {
          handleImageDelete(url)
            .then(() => {
              setFile(null);
            });
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  // Handle upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const imageUrl = await handleImageFileUpload(file, IMAGE_TYPE_PROFILE);
        if (imageUrl) {  
          sendToDatabase(imageUrl);
          onCloseModal();
          setTimeout(() => window.location.reload(), 200);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  // Validate the form
  const validateForm = () => {
    if (file && user) {
      setErrorMessage("");
      return true;
    }
    setErrorMessage("Please select a photo to upload.");
    return false;
  };

  return (
    <Fragment>
      {/* Modal Trigger */}
      {user ? (
        <button
          type="button"
          className="form-control mb-1 btn-primary"
          onClick={onOpenModal}
        >
          Change Profile Photo
        </button>
      ) : (
        <Link to="/login">
          <button type="button" className="form-control btn-primary">
            Login
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
          overlay: "editOverlay",
          modal: "editModal",
        }}
      >
        <div>
          <h3 id="ModalTitle">Change Profile Photo</h3>
          <div>
            <form onSubmit={handleUpload}>
              <p className="control" style={{ color: "red" }}>
                {errorMessage}
              </p>
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

export default EditProfilePhoto;
