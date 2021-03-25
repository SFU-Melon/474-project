import axios from "axios";
import React, { useEffect, Fragment, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import FollowButton from "../../components/FollowButton";
import Followers from "./Followers";
import Following from "./Following";
import EditProfile from "./EditProfile";
import EditProfilePhoto from "./EditProfilePhoto";
import Utility from "../../utils/index.js"

import ProfileTabs from "./ProfileTabs";

const Profile = () => {
  const { user } = useUserContext();

  const [userPosts, setUserPosts] = useState([]);
  const [userLikedPosts, setUserLikedPosts] = useState([]);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [joinDate, setJoinDate] = useState("");

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`/api/getAllPosts/${user?.id}`);
      setUserPosts(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserLikedPosts = async () => {
    try {
      const res = await axios.get(`/api/getPostLikedNotOwned/${user?.id}`);
      setUserLikedPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFollowData = async () => {
    try {
      const res = await axios.get(
        `/api/getFollowersAndFollowingUsers/${user?.id}`
      );
      if (res.data.success) {
        setFollowers(res.data.followers);
        setFollowing(res.data.following);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDate = () => {
    var tempBirthDate = Utility.formatDate(new Date(user?.dob));
    var tempJoinDate = Utility.formatDate(new Date(user?.joindate));
    setDateOfBirth(tempBirthDate ? tempBirthDate : "");
    setJoinDate(tempJoinDate ? tempJoinDate : "");
  };

  useEffect(() => {
    console.log("useEffect in profile");
    fetchUserPosts();
    fetchUserLikedPosts();
    fetchFollowData();
    handleDate();
    console.log(user);
  }, [user]);

  return (
    <div className="w-100 mx-auto">
      <Fragment>
        <div className="d-flex flex-row m-5">
          <div className="d-flex flex-column mx-3 w-25">
            <div className="container m-2 p-3">
              <img
                className="rounded img-fluid"
                src={user?.profilephoto ? user.profilephoto : "/null-user.png"}
              ></img>
            </div>
            <div className="container m-2 p-3">
              <EditProfilePhoto/>
              <EditProfile/>
              <h5 className="card-title">{user?.username}</h5>
              <div className="d-flex flex-row">
                <div className="w-25 me-1">
                  <FollowButton userId={user?.id} />
                </div>
              </div>
              <div className="me-1">
                <span>
                  <Followers followers={followers} />,{" "}
                  <Following following={following} />
                </span>
              </div>
              <hr className="w-100"></hr>
              <h5 className="card-title">About</h5>
              <hr className="w-100"></hr>
              <p>
                <strong>First Name</strong>: {user?.fname}
              </p>
              <p>
                <strong>Last Name:</strong> {user?.lname}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Join Date:</strong> {joinDate}
              </p>
              <p>
                <strong>Date of Birth:</strong> {dateOfBirth}
              </p>
            </div>
            {/* <div className="container m-2 p-3">
              <h5 className="card-title">Highlights</h5>
              <hr className="w-100"></hr>
              <p>
                Thinking about adding images of most liked posts by the user
                here or posts they like with the most traffic. Maybe commments.
              </p>
            </div> */}
          </div>
          <div className="d-flex flex-column mx-3 w-75">
            <div className="card-body">
              <ProfileTabs
                userLikedPosts={userLikedPosts}
                userPosts={userPosts}
              />
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default Profile;
