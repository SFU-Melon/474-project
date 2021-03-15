import axios from 'axios';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
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
      console.log(res.data.comments);
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
          <div className="d-inline-flex flex-row justify-content-between ">
            <p className="p-3">{comment.content}</p>
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
      ))}
    </>
  );
}
