import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContext";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import UserCard from "./UserCard"

/***
 * props: {
 *  userId: string,
 * }
 */

const Following = (props) => {
    // const { user } = useUserContext();
    const [open, setOpen] = useState(false);
    const [followingData, setFollowingData] = useState([]);
    const [numFollowing, setNumFollowing] = useState(0);

    // Handling modal open/close
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
                {props.following.map((person) => (
                    <UserCard person={person}/>
                ))}
                </div>
            </div>
        </Modal>
        </Fragment>
    );
};

export default Following;
