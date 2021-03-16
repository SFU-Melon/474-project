import axios from "axios";
import React, { useEffect, Fragment, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import PostCard from "../../components/PostCard";
import FollowButton from "../../components/FollowButton";
import Followers from "./Followers";
import Following from "./Following";
import NullPost from "./NullPost";

const Profile = () => {
  const { user } = useUserContext();

  const [userPosts, setUserPosts] = useState([]);
  const [userLikedPosts, setUserLikedPosts] = useState([]);

  const [numFollowing, setNumFollowing] = useState(0);
  const [numFollowers, setNumFollowers] = useState(0);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [joinDate, setJoinDate] = useState("");

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`/api/getAllPosts/${user.id}`);
      setUserPosts(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserLikedPosts = async () => {
    try {
      const res = await axios.get(`/api/getPostLikedNotOwned/${user.id}`);
      setUserLikedPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFollowData = async () => {
    try {
      const res = await axios.get(`/api/getFollowersAndFollowing/${user.id}`);
      setNumFollowers(res.data["success"][0].length);
      setNumFollowing(res.data["success"][1].length);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchFollowers = async (id) => {
    var tempFollowers = [];
    console.log("fetching followers: " + user.followers[0]);
    for (var i = 0; i < user.followers.length; i++){
      try {
        const res = await axios.get(`/api/getUserById/${user.followers[i]}`);
        tempFollowers.push(res.data["success"]);
      }
      catch (err) {
        console.log(err);
      }
    }
    console.log(tempFollowers);
    setFollowers(tempFollowers);
  }

  const fetchFollowing = async (id) => {
    var tempFollowing = [];
    console.log("fetching following: " + user.following[0]);
    for (var i = 0; i < user.following.length; i++){
      try {
        const res = await axios.get(`/api/getUserById/${user.following[i]}`);
        tempFollowing.push(res.data["success"]);
      }
      catch (err) {
        console.log(err);
      }
    }
    console.log(tempFollowing);
    setFollowing(tempFollowing);
  }

  const handleDate = () => {
    setDateOfBirth(new Date(user.dob).toDateString());
    setJoinDate(new Date(user.joindate).toDateString());
  }

  useEffect(() => {
    console.log("useEffect in profile");
    fetchUserPosts();
    fetchUserLikedPosts();
    fetchFollowData();
    
    fetchFollowers();
    fetchFollowing();
    handleDate();
    console.log(user);
  }, [user]);

  return (
    <div className = "w-100 mx-auto">
      <Fragment>
        <div className="d-flex flex-row m-5">
          <div className="d-flex flex-column mx-3 w-25">
            <div className="container m-2 p-3">
              <img className = "rounded img-fluid" 
                src={user.profilephoto ? 
                  user.profilephoto : "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png" }>
              </img> 
            </div>
            <div className = "container m-2 p-3">
              <h5 className="card-title" >{user.username}</h5>
              <div className="d-flex flex-row">
                <div className="w-25 me-1"><FollowButton userId = {user.id}/></div>
              </div> 
              <div className="me-1">
                <span>
                  <Followers followers = {followers} numFollowers = {numFollowers}/>, <Following following = {following} numFollowing ={numFollowing} />
                </span>
              </div>
              <hr className = "w-100"></hr>
              <h5 className="card-title" >About</h5>
                <hr className = "w-100"></hr>
              <p><strong>First Name</strong>: {user.fname}</p>
              <p><strong>Last Name:</strong> {user.lname}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Join:</strong> {joinDate}</p>
              <p><strong>Date of Birth:</strong> {dateOfBirth}</p>
            </div>
            <div className = "container m-2 p-3">
              <h5 className="card-title" >Highlights</h5>
              <hr className = "w-100"></hr>
              <p>
                Thinking about adding images of most liked posts by the user here or posts they like with the most traffic. Maybe commments.</p>
            </div>
          </div>
          <div className="d-flex flex-column mx-3 w-75">
              <div className="card-body">
                <h5 className="card-title" >Posts You've Liked</h5>
                <hr className = "w-100"></hr>
                {userLikedPosts.length > 0 ? userLikedPosts.map((post) => (
                  <PostCard key={post.id} post={post}></PostCard>
                )) : <NullPost/>}
              </div>
              <div className="card-body">
                <h5 className="card-title" >Your Posts</h5>
                <hr className = "w-100"></hr>
                {userPosts.length > 0 ? userPosts.map((post) => (
                  <PostCard key={post.id} post={post}></PostCard>
                )) : <NullPost/>}
              </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default Profile;
