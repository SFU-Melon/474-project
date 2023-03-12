import axios from "axios";
import React, { useEffect, Fragment, useState } from "react";
import { useUserContext } from "@contexts/UserContext";
import FollowButton from "@components/FollowButton";
import Followers from "./Followers";
import Following from "./Following";
import useLocalStorage from "@hooks/useLocalStorage";
import { useParams } from "react-router-dom";
import ProfileTabs from "./ProfileTabs";
import ScreenLoading from "@components/ScreenLoading";
import "./style.css";

const PublicProfile = () => {
  const { user } = useUserContext();
  const { username } = useParams();

  const [userPosts, setUserPosts] = useState([]);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [joinDate, setJoinDate] = useState("");

  const [profileUser, setProfileUser] = useState(null);

  const [stats, setStats] = useLocalStorage("user-stats", null);

  const [loading, setLoading] = useState(true);

  const fetchProfileUser = async () => {
    try {
      const res = await axios.get(`/user/api/getUserByUsername/${username}`);
      setProfileUser(res.data.success);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`/post/api/getAllPosts/${profileUser?.id}`);
      setUserPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFollowData = async () => {
    try {
      const res = await axios.get(
        `/user/api/getFollowersAndFollowingUsers/${profileUser?.id}`
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

  const fetchUserStats = async () => {
    try {
      const res = await axios.get(`/user/api/userstats/${profileUser?.id}`);
      console.log(res);
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchProfileUser();
    setTimeout(() => setLoading(false), 1000);
    return () => {
      localStorage.removeItem("cmpt354-user-stats");
    };
  }, []);

  useEffect(() => {
    if (profileUser) {
      fetchUserPosts();
      fetchFollowData();
      !stats && fetchUserStats();
      handleDate();
    }
  }, [profileUser]);

  return loading ? (
    <ScreenLoading />
  ) : (
    <div className="w-100 mx-auto">
      <Fragment>
        <div className="d-flex outer_flex_box ">
          <div className="d-flex flex-column px-3 flex-item-left">
            <div className="container m-2 p-3">
              <img
                className="rounded profile-pic-dim border border-1 border-dark"
                alt="user profile pic"
                src={
                  profileUser?.profilephoto
                    ? profileUser?.profilephoto
                    : "/null-user.png"
                }
              ></img>
            </div>
            <div className="m-2 p-3 mt-0 pt-0">
              <h5 className="user-name">{profileUser?.username}</h5>
              <div className="d-flex flex-row">
                <div>{user && <FollowButton userId={profileUser?.id} />}</div>
              </div>
              <div className="me-1">
                <span>
                  <Followers followers={followers} />,{" "}
                  <Following following={following} />
                </span>
              </div>
            </div>
            <div className="m-2 p-3 mt-0 pt-0">
              <h4 className="profile-section">About</h4>
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
                <strong>Joined on:</strong> {joinDate}
              </p>
              <p>
                <strong>Date of Birth:</strong> {dateOfBirth}
              </p>
            </div>
            <div className="m-2 p-3 mt-0 pt-0">
              <h5 className="profile-section">Highlights</h5>
              <hr className="w-100"></hr>
              <p>Total Votes Received: {stats?.totalLikes}</p>
              <p>Total Comments Received: {stats?.totalComments}</p>
              <p>Most Votes Received: {stats?.mostLikes}</p>
              <p>Most Comments Received: {stats?.mostComments}</p>
            </div>
          </div>
          <div className="d-flex flex-column px-3 flex-item-right">
            <div className="mt-5">
              <ProfileTabs
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
