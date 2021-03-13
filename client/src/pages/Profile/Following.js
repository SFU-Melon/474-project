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
    const [followingData, setFollowingData] = useState([]);
    const [numFollowing, setNumFollowing] = useState(0);

    // Handling modal open/close
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    // setNumFollowing(props.followingData.length);
    const useMountEffect = (fun) => useEffect(fun, [])

    // const fetchUserData = async () => {
    //     try {
    //         const res = await axios.get(`/api/getFollowersAndFollowing/${props.userId}`);
    //         setFollowingData(res.data["success"][0]);
    //         setNumFollowing(followingData.length);
    //         console.log(followingData);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    // useEffect(() => {
    //     fetchUserData();
    //     fetchUserData();
    //     fetchUserData();
    //     fetchUserData();
    //     fetchUserData();
    // }, [user, props.userId]);

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
