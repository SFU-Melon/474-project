import Vote from "./Vote";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Utility from "../utils";

/***
 * props: {
    post,
 * }
 */

export default function PostCard({ post }) {
  const [displayTime, setDisplayTime] = useState("");
  const encoded = Utility.encodeUUID(post.id);
  const encodedTitle = encodeURIComponent(post.title);

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
        <Link className="navbar-brand" to={`/post/${encodedTitle}/${encoded}`}>
          <h2>
            <u>{post.title}</u>
          </h2>
        </Link>
        <p>{displayTime}</p>
        <div className="d-flex flex-row justify-content-between">
          <p>
            Posted by {post.authorname} (Author Name) {post.location && "from"}{" "}
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
            {post.numofcomments}
            {" comment(s)"}
          </h4>
        </div>
      </div>
    </div>
  );
}
