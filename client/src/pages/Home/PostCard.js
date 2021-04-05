import Vote from "@components/Vote";
import { useUserContext } from "@contexts/UserContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Utility from "../../utils";
import "./PostCard.css";
import Tags from "@components/Tags";

export default function PostCard({ post }) {
  const [displayTime, setDisplayTime] = useState("");
  const encoded = Utility.encodeUUID(post.id);
  const encodedTitle = encodeURIComponent(post.title);
  const [tags, setTags] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    const time = Utility.getDisplayTime(post.datetime);
    setDisplayTime(time);
    setTags(post.tags);
  }, []);

  return (
    <div className="post-card card flex-row p-4 m-2">
      <div className="me-4">
        <Vote
          postId={post.id}
          numOfLikes={post.numoflikes}
          preVoteStatus={post.val}
        />
      </div>
      <div>
        <Link
          to={`/post/${encodedTitle}/${encoded}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <h2>{post.title}</h2>
          <div className="d-flex flex-row mb-3 align-items-start">
            <Tags tags={tags}/>
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
          <div className="d-flex flex-row justify-content-between">
            <p>
              Posted by{" "}
              <span>
                <Link
                  to={`profile/${
                    post.authorname !== user?.username ? "public/" : ""
                  }${post.authorname}`}
                >
                  {post.authorname}
                </Link>
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
