import React, { Fragment, useState } from 'react';
import axios from 'axios';

const LikeDislike = ({ id, user, numOfLikes }) => {
  const handleUpVote = async (e) => {
    console.log(user.id);
    axios.post(`/api/upVotePost/${user.id}`, { postId: id }).then((res) => {
      console.log(res);
    });
  };

  const handleDownVote = async (e) => {
    axios.post(`/api/downVotePost/${user.id}`, { postId: id }).then((res) => {
      console.log(res);
    });
  };

  return (
    <Fragment>
      <div className="vote p-3 d-flex flex-column align-items-center">
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
    </Fragment>
  );
};

export default LikeDislike;
