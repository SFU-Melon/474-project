import axios from 'axios';
import { useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import Utility from '../../utils';
import './style.css';

export default function CommentList({ postId, comments, setComments }) {
  const { user } = useUserContext();

  const handleDelete = async (commentId) => {
    try {
      const res = await axios.delete(
        `/api/deleteComment/${postId}/${commentId}`
      );
      if (res.data.success) {
        console.log('deleted!');
        setComments(comments.filter((comment) => comment.id !== commentId));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchAllComments = async () => {
    try {
      const res = await axios.get(`/api/getComments/${postId}`);
      setComments(res.data.comments);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchAllComments();
  }, []);

  //TODO: MAKE COMMENT DELETE WORK, delete button only showned for whom posted the comment.
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="card  w-75 align-self-center m-2">
          <div className="">
            <div className="d-flex flex-row mt-1 ">
              <span>
                {comment.profilephoto && (
                  <img
                    src={comment.profilephoto}
                    alt="auther's profile in comment"
                    className="comment-photo"
                  />
                )}
              </span>
              <p className="m-2">{comment.username}</p>
              <p className="m-2">{Utility.getDisplayTime(comment.datetime)}</p>
            </div>
            <div className="d-inline-flex flex-row justify-content-between ">
              <h5 className=" p-2 pb-3">{comment.content}</h5>

              {user?.id === comment?.userid && (
                <button
                  className="btn btn-danger btn-sm  align-self-center m-2"
                  onClick={() => handleDelete(comment.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
