import axios from "axios";
import React, { useEffect, Fragment, useState } from "react";
// import { useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import PostCard from "../../components/PostCard";
import FollowButton from "../../components/FollowButton";
import Followers from "./Followers";
import Following from "./Following";

const Profile = () => {
  const { user } = useUserContext();

  const [userPosts, setUserPosts] = useState([]);
  const [userLikedPosts, setUserLikedPosts] = useState([]);

  const [numFollowing, setNumFollowing] = useState(0);
  const [numFollowers, setNumFollowers] = useState(0);

  const [followerUserIDs, setFollowerIDs] = useState([]);
  const [followingUserIDs, setFollowingIDs] = useState([]);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

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
      setFollowerIDs(res.data["success"][0]);
      setFollowingIDs(res.data["success"][1]);
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
        // console.log(res);
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
        // console.log(res);
      }
      catch (err) {
        console.log(err);
      }
    }
    console.log(tempFollowing);
    setFollowing(tempFollowing);
  }

  useEffect(() => {
    console.log("useEffect in profile");
    fetchUserPosts();
    fetchUserLikedPosts();
    fetchFollowData();
    
    fetchFollowers();
    fetchFollowing();
  }, [user]);

  return (
    <div className = "w-75 mx-auto">
      <Fragment>
        <div className="d-flex flex-row mx-5">
          <div className="d-flex flex-column mx-3 w-25">
            <div className="card m-2">
              <img 
                  className = "rounded img-fluid"
                  src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"></img>
            </div>
            <div className = "m-2">
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
              <p>First Name:</p>
              <p>Last Name:</p>
              <p>Email:</p>
              <p>Date of Birth:</p>
            </div>
            <div className = "m-2">
                <h5 className="card-title" >About</h5>
                <hr className = "w-100"></hr>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
          </div>
          <div className="d-flex flex-column mx-3 w-75">
              <div className="card-body">
                <h5 className="card-title" >Likes</h5>
                <hr className = "w-100"></hr>
                {userLikedPosts.map((post) => (
                  <PostCard key={post.id} post={post}></PostCard>
                ))}
              </div>
              <div className="card-body">
                <h5 className="card-title" >Posts</h5>
                <hr className = "w-100"></hr>
                {userPosts.map((post) => (
                  <PostCard key={post.id} post={post}></PostCard>
                ))}
              </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default Profile;
