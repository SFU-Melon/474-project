import React from 'react';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';

const LikeDislike = ({ postId, numOfLikes }) => {
  const { user } = useUserContext();

  const handleUpVote = async (e) => {
    if (!user) {
      console.log('user not logged in');
    } else {
      axios
        .post(`/api/upVotePost/${user?.id}`, { postId: postId })
        .then((res) => {
          console.log(res);
        });
    }
  };

  const handleDownVote = async (e) => {
    if (!user) {
      console.log('user not logged in');
    } else {
      axios
        .post(`/api/downVotePost/${user?.id}`, { postId: postId })
        .then((res) => {
          console.log(res);
        });
    }
  };

  return (
    <div className="vote p-3 d-flex flex-column align-items-center">
      {console.log(postId)}
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => handleUpVote()}
      >
        <span className="material-icons">arrow_upward</span>
      </button>
      <span className="p-1">{numOfLikes}</span>
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => handleDownVote()}
      >
        <span className="material-icons">arrow_downward</span>
      </button>
    </div>
  );
};

export default LikeDislike;
