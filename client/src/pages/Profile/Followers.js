import { useState, Fragment } from "react";
import { Modal } from "react-responsive-modal";
import UserCard from "@components/UserCard";

const Followers = (props) => {
  // Handling modal open/close
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <Fragment>
      {/* eslint-disable-next-line */}
      <a onClick={onOpenModal}>
        <span className="custom-links">
          {props.followers?.length} Followers
        </span>
      </a>

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
          <hr className="w-100"></hr>
          <div>
            {props.followers?.length === 0 ? (
              <div className="text-center">
                <img
                  className="rounded img-fluid userIconImg mb-3"
                  src="/null-follow.png"
                  alt="profile"
                ></img>
                <p className="text-center">No Followers Yet</p>
              </div>
            ) : (
              props.followers?.map((item, i) => (
                <UserCard key={i} person={item} />
              ))
            )}
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Followers;
