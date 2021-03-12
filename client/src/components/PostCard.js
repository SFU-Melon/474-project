import Vote from "./Vote";
import moment from "moment";
import { useEffect, useState } from "react";
/***
 * props: {
    post,
 * }
 */

const IMG_URL =
  "https://images.unsplash.com/photo-1506038634487-60a69ae4b7b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1902&q=80";

export default function PostCard({ post }) {
  const formatTime = () => {
    //To-Do
    const now = moment();
    const post_date = moment(post.datetime);
    const interval = moment.duration(now.diff(post_date));
    const minutes = interval.as("minutes");
    const days = interval.as("days");
    const hours = interval.as("hours");
    console.log("hours: " + hours + " days: " + days + " minutes: " + minutes);
  };

  useEffect(() => {
    formatTime();
  }, []);

  return (
    <div className="card flex-row p-3 m-2">
      <Vote
        postId={post.id}
        numOfLikes={post.numoflikes}
        preVoteStatus={post.votestatus}
      />
      <div>
        <h2>{post.title}</h2>
        <p>1 hour ago</p>
        <div className="d-flex flex-row justify-content-between">
          <p>
            Posted by {post.authorname} (John) {post.location && "from"}{" "}
            {post.location}
          </p>
        </div>
        <p style={{ whiteSpace: "pre-wrap" /* needed for line breaks */ }}>
          {post.content}
        </p>
        <div>
          {post.imageurl && <img src={post.imageurl} className="post-card" />}
        </div>
        <div>
          <h4>
            {post.numofcomments}{" "}
            {post.numofcomments > 1 ? "comments" : "comment"}{" "}
          </h4>
        </div>
      </div>
    </div>
  );
}
