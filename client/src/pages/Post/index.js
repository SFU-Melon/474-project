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
      POST PAGE - {id} - {user && user.username}
      <LikeDislike/>
    </div>
  </Fragment>;
};

export default Post;
