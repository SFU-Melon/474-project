import axios from "axios";
import React, { useEffect, Fragment, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import FollowButton from "../../components/FollowButton";
import Followers from "./Followers";
import Following from "./Following";
import { useParams } from "react-router-dom";

import ProfileTabs from "./ProfileTabs";

const PublicProfile = () => {
  const { user } = useUserContext();
  const { username } = useParams();

  const [userPosts, setUserPosts] = useState([]);
  const [userLikedPosts, setUserLikedPosts] = useState([]);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [joinDate, setJoinDate] = useState("");

  const [profileUser, setProfileUser] = useState(null);

  const fetchProfileUser = async () => {
    try {
      const res = await axios.get(`/api/getUserByUsername/${username}`);
      setProfileUser(res.data.success);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`/api/getAllPosts/${profileUser?.id}`);
      setUserPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserLikedPosts = async () => {
    try {
      const res = await axios.get(
        `/api/getPostLikedNotOwned/${profileUser?.id}`
      );
      setUserLikedPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFollowData = async () => {
    try {
      const res = await axios.get(
        `/api/getFollowersAndFollowingUsers/${profileUser?.id}`
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
    setDateOfBirth(new Date(profileUser?.dob).toDateString());
    setJoinDate(new Date(profileUser?.joindate).toDateString());
  };

  useEffect(() => {
    fetchProfileUser();
  }, []);

  useEffect(() => {
    if (profileUser) {
      fetchUserPosts();
      fetchUserLikedPosts();
      fetchFollowData();
      handleDate();
    }
  }, [profileUser]);

  return (
    <div className="w-100 mx-auto">
      <Fragment>
        <div className="d-flex flex-row m-5">
          <div className="d-flex flex-column mx-3 w-25">
            <div className="container m-2 p-3">
              <img
                className="rounded img-fluid"
                src={
                  profileUser?.profilephoto
                    ? profileUser?.profilephoto
                    : "/null-user.png"
                }
              ></img>
            </div>
            <div className="container m-2 p-3">
              <h5 className="card-title">{profileUser?.username}</h5>
              <div className="d-flex flex-row">
                <div className="w-25 me-1">
                  {user && <FollowButton userId={profileUser?.id} />}
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
                <strong>First Name</strong>: {profileUser?.fname}
              </p>
              <p>
                <strong>Last Name:</strong> {profileUser?.lname}
              </p>
              <p>
                <strong>Email:</strong> {profileUser?.email}
              </p>
              <p>
                <strong>Join:</strong> {joinDate}
              </p>
              <p>
                <strong>Date of Birth:</strong> {dateOfBirth}
              </p>
            </div>
            <div className="container m-2 p-3">
              <h5 className="card-title">Highlights</h5>
              <hr className="w-100"></hr>
              <p>
                Thinking about adding images of most liked posts by the user
                here or posts they like with the most traffic. Maybe commments.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column mx-3 w-75">
            <div className="card-body">
              <ProfileTabs
                userLikedPosts={userLikedPosts}
                userPosts={userPosts}
                username={profileUser?.username}
              />
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default PublicProfile;
