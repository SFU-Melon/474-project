import axios from "axios";
import React, { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import PostCard from "../../components/PostCard";
import FollowButton from "../../components/FollowButton";

const Profile = () => {
  const { username } = useParams();
  const { user } = useUserContext();
  const [allPosts, setAllPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      const res = await axios.get("/api/getAllPosts");
      setAllPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    console.log("useEffect in home");
  }, [user]);

  return (
    <div className = "mt-5">
      <Fragment>
        <div class="d-flex flex-row mx-5">
          <div class="d-flex flex-column mx-3 w-25">
            <div class="card m-2">
              <img 
                  className = "rounded img-fluid"
                  src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"></img>
            </div>
            <div class = "m-2">
              <h5 class="card-title" >{user.username}</h5>
              <p class="card-text">19 Followers, 25 Likes</p>
              <hr class = "w-100"></hr>
              <p>First Name:</p>
              <p>Last Name:</p>
              <p>Email:</p>
              <p>Date of Birth:</p>
              <div class="d-flex flex-row">
                <div class="w-25 me-1"><FollowButton></FollowButton></div>
                <div class="w-50 me-1"><FollowButton></FollowButton></div>
              </div> 
            </div>
            <div class = "m-2">
                <h5 class="card-title" >About</h5>
                <hr class = "w-100"></hr>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
          </div>
          <div class="d-flex flex-column mx-3 w-75">
              <div class="card-body">
                <h5 class="card-title" >Likes</h5>
                <hr class = "w-100"></hr>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
              <div class="card-body">
                <h5 class="card-title" >Posts</h5>
                <hr class = "w-100"></hr>
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
