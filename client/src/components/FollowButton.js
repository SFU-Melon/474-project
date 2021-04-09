import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "@contexts/UserContext";
import { Link } from "react-router-dom";

/***
 * props: {
 *  userId: string,
 * }
 */

export default function FollowButton(props) {
  const [following, setFollowing] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    if (user && user.following.includes(props.userId)) {
      setFollowing(true);
    }
  }, [user, props.userId]);

  const unfollow = async () => {
    try {
      const res = await axios.post("/api/unfollows", {
        user1_id: user.id,
        user2_id: props.userId,
      });
      if (res.data.success) {
        setFollowing(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const follow = async () => {
    try {
      const res = await axios.post("/api/follows", {
        user1_id: user.id,
        user2_id: props.userId,
      });
      if (res.data.success) {
        setFollowing(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {user ? (
        user.id !== props.userId && (
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => {
              following ? unfollow() : follow();
            }}
          >
            {following ? "Following" : "Follow"}
          </button>
        )
      ) : (
        <Link to="/login">
          <button type="button" className="btn btn-outline-dark">
            Follow
          </button>
        </Link>
      )}
    </div>
  );
}
