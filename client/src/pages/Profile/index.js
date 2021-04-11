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
    var tempBirthDate = Utility.formatDate(user?.dob);
    var tempJoinDate = Utility.formatDate(user?.joindate);
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
        <div className="d-flex outer_flex_box ">
          <div className="d-flex flex-column px-3 flex-item-left">
            <div className="m-2 p-3">
              <img
                className="rounded img-fluid border border-1 border-dark"
                alt="user profile pic"
                src={user?.profilephoto ? user.profilephoto : "/null-user.png"}
              ></img>
            </div>
            <div className="m-2 p-3 mt-0 pt-0">
              <EditProfilePhoto />
              <EditProfile />
              <h4 className="user-name">{user?.username}</h4>
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
            </div>
            <div className="m-2 p-3 mt-0 pt-0">
              <h4 className="profile-section">About</h4>
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
            <div className="m-2 p-3 mt-0 pt-0">
              <h4 className="profile-section">Highlights</h4>
              <hr className="w-100"></hr>
              <p>
                <strong>Total Votes Received:</strong> {stats?.totalLikes}
              </p>
              <p>
                <strong>Total Comments Received:</strong> {stats?.totalComments}
              </p>
              <p>
                <strong>Most Votes Received:</strong> {stats?.mostLikes}
              </p>
              <p>
                <strong>Most Comments Received:</strong> {stats?.mostComments}
              </p>
            </div>
          </div>
          <div className="d-flex flex-column px-3 flex-item-right">
            <div className="mt-5">
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
