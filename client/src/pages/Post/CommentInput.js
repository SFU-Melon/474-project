import { useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function CommentInput({ postId }) {
  const [comment, setComment] = useState('');
  const { user } = useUserContext();
  const [errorMessage, setErrorMessage] = useState('');
  const COMMENT_MIN_LENGTH = 1;

  let location = useLocation().pathname;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log('not validated');
      return;
    }
    try {
      // User should already be logged in.
      console.log('submitting comment', comment);
      const result = await axios.post(
        `/api/submitComment/${user.id}/${postId}`,
        {
          content: comment,
        }
      );
      if (result.data.success) {
        setComment('');
        console.log('succeed in posting comment');
      }
      // NEED TO IMPROVE!!! HOW CAN I UPDATE THE LIST WITHOUT REFRESHING THE WHOLE PAGE???
      window.location = location;
    } catch (err) {
      console.error(err.message);
    }
  };

  const validateForm = () => {
    if (!comment || comment.length < COMMENT_MIN_LENGTH) {
      setErrorMessage('comment must be at least 1 characters.');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {user ? (
        <form
          className="d-flex flex-column flex-wrap align-items-center  w-75"
          onSubmit={handleSubmit}
        >
          <p className="control align-self-start" style={{ color: 'red' }}>
            {errorMessage}
          </p>
          <textarea
            className="w-100 p-3"
            style={{ height: 120 }}
            type="text"
            placeholder="Write your comment here..."
            onChange={(e) => setComment(e.target.value)}
          />
          <button className=" btn btn-primary align-self-end m-2">
            Comment
          </button>
        </form>
      ) : (
        <div className="">
          <Link to={{ pathname: '/login', state: { prevPath: location } }}>
            <button type="button" className="btn btn-primary m-3">
              Login to Comment
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
