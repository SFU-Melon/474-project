import { useState, Fragment } from "react";
import { Modal } from "react-responsive-modal";
import UserCard from "./UserCard"

const Following = (props) => {

    // Handling modal open/close
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <Fragment>
        <a href="#" onClick={onOpenModal}><span>{props.numFollowing} Following</span></a>
        
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
                <h5 id="ModalTitle">Following</h5>
                <hr className = "w-100"></hr>
                <div>
                    {props.numFollowing == 0 ? 
                        <div className = "text-center"><img className="rounded img-fluid userIconImg mb-3" src="https://www.flaticon.com/svg/vstatic/svg/747/747376.svg?token=exp=1615857401~hmac=d7b5fa3ab61d0729de6154f56e66189e"></img>
                        <p className="text-center">No Follows Yet</p></div>
                        : props.following.map((item) => (
                        <UserCard person={item}/>
                    ))}
                </div>
            </div>
        </Modal>
        </Fragment>
    );
};

export default Following;
