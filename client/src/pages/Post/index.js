import { useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import React, { Fragment } from 'react';

// Components
import LikeDislike from "../../components/LikeDislike"

const Post = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  
  return <Fragment>
    <div className = "container">
      POST PAGE - PostID {id} - UserID {user && user.username}
      <LikeDislike id={id} user={user}/>
    </div>
  </Fragment>;
};

export default Post;
