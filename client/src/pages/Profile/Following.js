import { useState, Fragment } from 'react';
import { Modal } from 'react-responsive-modal';
import UserCard from './UserCard';

const Following = (props) => {
  // Handling modal open/close
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <Fragment>
      <a href="javascript:void()" onClick={onOpenModal}>
        <span>{props.following?.length} Following</span>
      </a>

      {/* Modal */}
      <Modal
        className="custom-modal"
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: 'customOverlay',
          modal: 'followModal',
        }}
      >
        <div>
          <h5 id="ModalTitle">Following</h5>
          <hr className="w-100"></hr>
          <div>
            {props.following?.length === 0 ? 
            (
              <div className="text-center">
                <img
                  className="rounded img-fluid userIconImg mb-3"
                  src="/null-follow.png"
                  alt="profile"
                ></img>
                <p className="text-center">No Follows Yet</p>
              </div>
            ) : 
            (
              props.following?.map( (item, i) => (
                <UserCard key={i} person={item} />
              ))
            )}
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Following;
