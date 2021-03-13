import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContext";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

/***
 * props: {
 *  userId: string,
 * }
 */

const Following = (props) => {
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);

  // Handling modal open/close
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <Fragment>
      <a href="#" onClick={onOpenModal}><span>19 Following</span></a>
      
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
          <h3 id="ModalTitle">Following</h3>
          <div>
          
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Following;
