import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Utility from "../../utils";
import "./ProfilePostCard.css";
import Tags from "@components/Tags";

export default function PostCard({ post }) {
  const [displayTime, setDisplayTime] = useState("");
  const encoded = Utility.encodeUUID(post.id);
  const encodedTitle = encodeURIComponent(post.title);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const time = Utility.getDisplayTime(post.datetime);
    setDisplayTime(time);
    setTags(post.tags);
  }, []);

  return (
    <Link
      to={`/post/${encodedTitle}/${encoded}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="post-card card flex-row p-3 m-2">
        <div className="image ">
          {post.imageurl && (
            <img
              src={post.imageurl}
              alt="plant in postcard"
              className="profile-card"
            />
          )}
        </div>
        <div className="d-flex flex-column justify-content-between">
          <div>
            <h2>{post.title}</h2>
            <Tags tags={tags}/>
            <p>{displayTime}</p>
          </div>
          <div className="">
            <p className="">
              {post.location && "from"} {post.location}
            </p>

            <h5 className="">
              {post.numoflikes}
              {" vote(s), "}

              {post.numofcomments}
              {" comment(s)"}
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
}
