import { useState, useEffect } from "react";
import { useUserContext } from "@contexts/UserContext";
import { Link } from "react-router-dom";
import { axiosApiInstance } from "../utils/axiosConfig";

/***
 * props: {
 *  userId: string,
 * }
 */

export default function FollowButton(props) {
  const [following, setFollowing] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    if (user && user.following.some((obj) => obj.id === props.userId)) {
      setFollowing(true);
    }
  }, [user, props.userId]);

  const unfollow = async () => {
    try {
      const res = await axiosApiInstance.post("/user/api/unfollow", {
        follower: user.id,
        followee: props.userId,
      });
      if (res.status === 200) {
        setFollowing(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const follow = async () => {
    try {
      const res = await axiosApiInstance.post("/user/api/follow", {
        follower: user.id,
        followee: props.userId,
      });
      if (res.status === 200) {
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
