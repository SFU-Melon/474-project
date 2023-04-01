import Vote from "@components/Vote";
import { useUserContext } from "@contexts/UserContext";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Utility from "@utils";
import "./PostCard.css";
import Tags from "@components/Tags";

export default function PostCard({ post }) {
  const [displayTime, setDisplayTime] = useState("");
  const encoded = Utility.encodeUUID(post.id);
  const encodedTitle = encodeURIComponent(post.title);
  const [tags, setTags] = useState([]);
  const { user } = useUserContext();
  const history = useHistory();

  useEffect(() => {
    const time = Utility.getDisplayTime(post.datetime);
    setDisplayTime(time);
    setTags(post.tags);
  }, []);

  const handleAuthorClick = (e) => {
    e.stopPropagation();
    history.push(`/profile/${
      post.authorname !== user?.username ? "public/" : ""
    }${post.authorname}`);
  }

  return (
    <div className="post-card card flex-row p-3 m-2">
      <Vote
        votedId={post.id}
        numOfLikes={post.numoflikes}
        preVoteStatus={post.val}
        type={"post"}
      />
      <div className="ms-3">
        <Link
          to={`/post/${encodedTitle}/${encoded}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <h2 className="text-break">{post.title}</h2>
          <div className="d-flex flex-row mb-3 align-items-start">
            <Tags tags={tags} />
          </div>
          <div>
            {post.imageurl && (
              <img
                src={post.imageurl}
                alt="plant in postcard"
                className="plant-image"
              />
            )}
          </div>
          <p>{displayTime}</p>
          <div className="d-flex flex-row justify-content-between text-break">
            <p>
              Posted by{" "}
              <span onClick={handleAuthorClick} style={{ cursor: "pointer" }}>
                {post.authorname}
              </span>{" "}
              {post.location && "from"} {post.location}
            </p>
          </div>
          <div>
            <h4>
              {post.numofcomments}
              {" comment(s)"}
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
