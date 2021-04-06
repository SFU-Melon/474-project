import React, { useState, useEffect } from 'react';
import { useUserContext } from '@contexts/UserContext';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Vote = ({ votedId, numOfLikes, preVoteStatus, type }) => {
  const { user } = useUserContext();
  const [voteStatus, setVoteStatus] = useState(0);
  const [totalLikes, setTotalLikes] = useState(numOfLikes);

  let location = useLocation().pathname;

  const handleVote = async (voteOperation) => {
    try {
      const res = await axios.post(`/api/${voteOperation}/${user.id}`, {
        votedId,
        type,
      });
      setVoteStatus(res.data.newVoteStatus);
      setTotalLikes(res.data.numoflikes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setVoteStatus(preVoteStatus);
  }, [user, preVoteStatus]);

  return (
    <div className="vote d-flex flex-column align-items-center">
      {user ? (
        <button
          className={`btn ${
            voteStatus === 1 ? 'btn-secondary' : 'btn-outline-secondary'
          }  btn-sm`}
          onClick={() => handleVote('upVotePost')}
        >
          <span className="material-icons">arrow_upward</span>
        </button>
      ) : (
        <Link to={{ pathname: '/login', state: { prevPath: location } }}>
          <button className="btn btn-outline-secondary">
            <span className="material-icons">arrow_upward</span>
          </button>
        </Link>
      )}
      <span className="p-1">{totalLikes}</span>
      {user ? (
        <button
          className={`btn ${
            voteStatus === -1 ? 'btn-danger' : 'btn-outline-danger'
          }  btn-sm`}
          onClick={() => handleVote('downVotePost')}
        >
          <span className="material-icons">arrow_downward</span>
        </button>
      ) : (
        <Link to={{ pathname: '/login', state: { prevPath: location } }}>
          <button className="btn btn-outline-danger">
            <span className="material-icons">arrow_downward</span>
          </button>
        </Link>
      )}
    </div>
  );
};

export default Vote;
