import axios from "axios";
import React, { useEffect, Fragment, useState } from "react";
import { useUserContext } from "@contexts/UserContext";
import FollowButton from "@components/FollowButton";
import Followers from "./Followers";
import Following from "./Following";
import EditProfile from "./EditProfile";
import EditProfilePhoto from "./EditProfilePhoto";
import Utility from "@utils/index.js";
import useLocalStorage from "@hooks/useLocalStorage";
import ProfileTabs from "./ProfileTabs";
import ScreenLoading from "@components/ScreenLoading";

const Profile = () => {
  const { user } = useUserContext();

  const [userPosts, setUserPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [stats, setStats] = useLocalStorage("user-stats", null);

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [joinDate, setJoinDate] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`/api/getAllPosts/${user?.id}`);
      setUserPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSavedPosts = async () => {
    try {
      const res = await axios.get("/api/getAllSavedPosts");
      setSavedPosts(res.data.posts);
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

  const fetchUserStats = async () => {
    try {
      const res = await axios.get(`/api/userstats/${user?.id}`);
      if (res.data.success) {
        setStats(res.data.stats);
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
    setTimeout(() => setLoading(false), 1000);
    return () => {
      localStorage.removeItem("cmpt354-user-stats");
    };
  }, []);

  useEffect(() => {
    fetchUserPosts();
    fetchSavedPosts();
    fetchFollowData();
    !stats && fetchUserStats();
    handleDate();
  }, [user]);

  return loading ? (
    <ScreenLoading />
  ) : (
    <div className="w-100 mx-auto">
      <Fragment>
        <div className="d-flex flex-row m-5">
          <div className="d-flex flex-column mx-3 w-25">
            <div className="container m-2 p-3">
              <img
                className="rounded img-fluid"
                alt="user profile pic"
                src={user?.profilephoto ? user.profilephoto : "/null-user.png"}
              ></img>
            </div>
            <div className="container m-2 p-3">
              <EditProfilePhoto />
              <EditProfile />
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
                <strong>Joined on:</strong> {joinDate}
              </p>
              <p>
                <strong>Date of Birth:</strong> {dateOfBirth}
              </p>
            </div>
            <div className="container m-2 p-3">
              <h5 className="card-title">Highlights</h5>
              <hr className="w-100"></hr>
              <p>Total Votes Received: {stats?.totalLikes}</p>
              <p>Total Comments Received: {stats?.totalComments}</p>
              <p>Most Votes Received: {stats?.mostLikes}</p>
              <p>Most Comments Received: {stats?.mostComments}</p>
            </div>
          </div>
          <div className="d-flex flex-column mx-3 w-75">
            <div className="card-body">
              <ProfileTabs
                userPosts={userPosts}
                savedPosts={savedPosts}
                username={user?.username}
              />
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default Profile;
