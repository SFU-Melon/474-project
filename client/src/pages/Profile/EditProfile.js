import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "@contexts/UserContext";
import { Link } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Utility from "@utils";

const EditProfile = () => {
  const { user } = useUserContext();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDateOfBirth] = useState(new Date(user?.dob));
  const [dateOfBirthDB, setDateOfBirthDB] = useState(new Date(user?.dob));

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // Handling modal open/close
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // Handle user info fields
  const handleInfo = () => {
    setFirstName(user ? user.fname : "");
    setLastName(user ? user.lname : "");
    setEmail(user ? user.email : "");
    var tempDate = Utility.formatDate(user?.dob);
    setDateOfBirth(tempDate ? tempDate : "");
    setDateOfBirthDB(tempDate ? tempDate : "");
  };

  useEffect(() => {
    handleInfo();
  }, [user]);

  // Send post data to database
  const editUserInfo = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        axios
          .post(`/api/editProfileInfo/${user.id}`, {
            fname: firstName,
            lname: lastName,
            email: email,
            dob: dob,
          })
          .then((res) => {});
      } catch (err) {
        console.error(err.message);
      }
      onCloseModal();
      setTimeout(() => window.location.reload(), 400);
    }
  };

  // Validate the form
  const validateForm = () => {
    let tempErr = {};
    if (!firstName) {
      tempErr.firstName = "First name is required";
    } else if (!/^[a-zA-Z ]{2,20}$/.test(firstName.trim())) {
      tempErr.firstName = "First name is invalid";
    }

    if (!lastName) {
      tempErr.lastName = "Last name is required";
    } else if (!/^[a-zA-Z ]{2,20}$/.test(lastName.trim())) {
      tempErr.lastName = "Last name is invalid";
    }

    if (!email) {
      tempErr.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErr.email = "Email address is invalid";
    }

    if (!dob) {
      tempErr.dob = "Date of birth is required";
    } else if (
      !/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-](19|20)\d\d$/.test(
        dob
      )
    ) {
      tempErr.dob = "Date of birth is invalid";
    }

    if (Object.keys(tempErr).length > 0) {
      setErrors(tempErr);
      return false;
    } else if (
      firstName === user.fname &&
      lastName === user.lname &&
      email === user.email &&
      dob === dateOfBirthDB
    ) {
      tempErr.noChange = "No changes have been applied.";
      setErrors(tempErr);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  return (
    <Fragment>
      {/* Modal Trigger */}
      {user ? (
        <button
          type="button"
          className="form-control mb-3 btn-primary"
          onClick={onOpenModal}
        >
          Edit Profile
        </button>
      ) : (
        <Link to="/login">
          <button type="button" className="form-control mb-3 btn-primary">
            Edit Profile
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
          <h3 id="ModalTitle">Edit Profile</h3>
          <p className="control error">{errors?.noChange}</p>
          <div>
            <form onSubmit={editUserInfo}>
              <div className="mb-2">
                <h6>First Name</h6>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <p className="control error">{errors?.firstName}</p>
              </div>
              <div className="mb-2">
                <h6>Last Name</h6>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <p className="control error">{errors?.lastName}</p>
              </div>
              <div className="mb-2">
                <h6>Email</h6>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="control error">{errors?.email}</p>
              </div>
              <div className="mb-2">
                <h6>
                  Date of Birth <em>(DD/MM/YYYY)</em>
                </h6>
                <input
                  type="text"
                  className="form-control"
                  value={dob}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <p className="control error">{errors?.dob}</p>
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

export default EditProfile;
