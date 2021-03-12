import Vote from "./Vote";
import { useEffect, useState } from "react";
import Utility from "../utils";

/***
 * props: {
    post,
 * }
 */

export default function PostCard({ post }) {
  const [displayTime, setDisplayTime] = useState("");

  useEffect(() => {
    const time = Utility.getDisplayTime(post.datetime);
    setDisplayTime(time);
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
        <p>{displayTime}</p>
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
