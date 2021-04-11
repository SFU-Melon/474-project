import axios from "axios";
import { useState, useEffect } from "react";
import FollowButton from "@components/FollowButton";
import { useUserContext } from "@contexts/UserContext";
import { Link } from "react-router-dom";

export default function Top10Users() {
  const [users, setUsers] = useState(null);
  const { user } = useUserContext();

  useEffect(() => {
    let isMounted = true;
    fetchUsers().then((fetched_users) => {
      if (isMounted) setUsers(fetched_users);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/getTopUsers");
      //setUsers(res.data.users);
      return res.data.users;
    } catch (err) {
      console.log(err);
    }
  };

  const UserCardInHomePage = ({ userInCard }) => {
    return (
      <div className="card p-2 flex-row">
        <div className="w-25 m-0">
          <div className="w-75">
            <img
              className="img-fluid rounded m-0"
              alt="User Profile Pic"
              src={
                userInCard?.profilephoto
                  ? userInCard.profilephoto
                  : "/null-user.png"
              }
            ></img>
          </div>
        </div>
        <div>
          <Link
            to={`profile/${
              userInCard.username !== user?.username ? "public/" : ""
            }${userInCard.username}`}
          >
            <h3 className="text-break">{userInCard.username} </h3>
          </Link>
          <FollowButton userId={userInCard.id} />

          <p className="mt-1">Followers: {userInCard.numoffollowers}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <h2 className="card text-start p-2 mt-3 ">Users:</h2>
      {users &&
        users.map((userInCard, i) => {
          return <UserCardInHomePage key={i} userInCard={userInCard} />;
        })}
    </>
  );
}
