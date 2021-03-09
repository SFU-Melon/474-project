import React, { useState, useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';

const LikeDislike = ({ postId, numOfLikes }) => {
  const { user } = useUserContext();
  const [voteStatus, setVoteStatus] = useState(0);

  const handleVote = async (voteOperation) => {
    if (!user) {
      console.log('user not logged in');
    } else {
      try {
        const res = await axios.post(`/api/${voteOperation}/${user?.id}`, {
          postId: postId,
        });
        setVoteStatus(res.data.newVoteStatus);
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
    }
  }, []);

  return (
    <div className="vote p-3 d-flex flex-column align-items-center">
      <button
        className={`btn ${
          voteStatus === 1 ? 'btn-secondary' : 'btn-outline-secondary'
        }  btn-sm`}
        onClick={() => handleVote('upVotePost')}
      >
        <span className="material-icons">arrow_upward</span>
      </button>
      <span className="p-1">{numOfLikes}</span>
      <button
        className={`btn ${
          voteStatus === -1 ? 'btn-danger' : 'btn-outline-danger'
        }  btn-sm`}
        onClick={() => handleVote('downVotePost')}
      >
        <span className="material-icons">arrow_downward</span>
      </button>
    </div>
  );
};

export default LikeDislike;
