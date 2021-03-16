import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContext";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import UserCard from "./UserCard"

const Followers = (props) => {
  // const { user } = useUserContext();
  const [open, setOpen] = useState(false);

  // Handling modal open/close
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <Fragment>
      <a href="#" onClick={onOpenModal}><span>{props.numFollowers} Followers</span></a>
      
      {/* Modal */}
      <Modal
        className="custom-modal"
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "followModal",
        }}
      >
        <div>
          <h3 id="ModalTitle">Followers</h3>
          <hr className = "w-100"></hr>
          <div>
            {props.numFollowers == 0 ? 
              <div className = "text-center"><img className="rounded img-fluid userIconImg mb-3" src="https://www.flaticon.com/svg/vstatic/svg/747/747376.svg?token=exp=1615857401~hmac=d7b5fa3ab61d0729de6154f56e66189e"></img>
              <p className="text-center">No Followers Yet</p></div>
              : props.followers.map((item) => (
                <UserCard person={item}/>
              ))}
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Followers;
