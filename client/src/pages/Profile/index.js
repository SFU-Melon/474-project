import axios from "axios";
import React, { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import PostCard from "../../components/PostCard";
import FollowButton from "../../components/FollowButton";
import Followers from "./Followers";
import Following from "./Following";

const Profile = () => {
  const { user } = useUserContext();
  const [allPosts, setAllPosts] = useState([]);
  const [followerData, setFollowerData] = useState([]);
  const [followingData, setFollowingData] = useState([]);

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`/api/getAllPosts/${user.id}`);
      setAllPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`/api/getFollowersAndFollowing/${user.id}`);
      setFollowerData(res.data["success"][0]);
      setFollowingData(res.data["success"][1]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserPosts();
    console.log("useEffect in profile");
    fetchUserData();
  }, [user]);

  return (
    
    <div className = "mt-5">
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
                <div className="w-25 me-1"><FollowButton/></div>
              </div> 
              <div className="me-1"><span><Followers followers={followerData} />, <Following following={followingData}/></span></div>
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
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
              <div className="card-body">
                <h5 className="card-title" >Posts</h5>
                <hr className = "w-100"></hr>
                {allPosts.map((post) => (
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
