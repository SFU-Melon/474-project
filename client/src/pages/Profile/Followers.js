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

const Followers = (props) => {
  // const { user } = useUserContext();
  const [open, setOpen] = useState(false);
  // const [followerData, setFollowerData] = useState([]);
  // const [ numFollowers, setNumFollowers] = useState(0);

  // Handling modal open/close
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // setNumFollowers(props.followerData.length);
  // const useMountEffect = (fun) => useEffect(fun, [])
  // const fetchUserData = async () => {
  //   try {
  //     const res = await axios.get(`/api/getFollowersAndFollowing/${props.userId}`);
  //     setFollowerData(res.data["success"][0]);
  //     setNumFollowers(followerData.length);
  //     console.log(followerData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   fetchUserData();
  //   fetchUserData();
  //   fetchUserData();
  //   fetchUserData();
  //   fetchUserData();
  // }, [user, props.userId]);

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
          modal: "customModal",
        }}
      >
        <div>
          <h3 id="ModalTitle">Followers</h3>
          <hr className = "w-100"></hr>
          <div>
          
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Followers;
