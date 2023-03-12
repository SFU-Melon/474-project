import axios from "axios";
import { useEffect } from "react";
import { useUserContext } from "@contexts/UserContext";
import Utility from "@utils";
import "./style.css";
import { Link } from "react-router-dom";
import Vote from "@components/Vote";

export default function CommentList({ postId, comments, setComments }) {
  const { user } = useUserContext();

  const handleDelete = async (commentId) => {
    try {
      const res = await axios.delete(
        `/post/api/deleteComment/${postId}/${commentId}`
      );
      if (res.data.success) {
        setComments(comments.filter((comment) => comment.id !== commentId));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchAllComments = async () => {
    try {
      const res = await axios.get(`/post/api/getComments/${postId}`);
      setComments(res.data.comments);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchAllComments();
  }, []);

  return (
    <>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="card  w-75 align-self-center m-2 flex-row"
        >
          <div className="m-1">
            <Vote
              votedId={{ commentId: comment.id, postId: comment.postid }}
              numOfLikes={comment.numoflikes}
              preVoteStatus={comment.val}
              type={"comment"}
            />
          </div>
          <div className="">
            <div className="d-flex flex-row mt-1 ">
              <span>
                <img
                  src={
                    comment?.profilephoto
                      ? comment.profilephoto
                      : "/null-user.png"
                  }
                  alt="auther's profile in comment"
                  className="comment-photo"
                />
              </span>
              <Link to={`/profile/public/${comment.username}`} className="m-2">
                {comment.username}
              </Link>
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
