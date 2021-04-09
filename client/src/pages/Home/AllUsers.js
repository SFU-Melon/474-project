import axios from "axios";
import { useState, useEffect } from "react";
import FollowButton from "@components/FollowButton";

export default function AllUsers() {
  const [users, setUsers] = useState(null);

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
      const res = await axios.get("/api/getAllUsers");
      //setUsers(res.data.users);
      return res.data.users;
    } catch (err) {
      console.log(err);
    }
  };

  const UserCardInHomePage = ({ user }) => {
    return (
      <div className="card p-2">
        <h3 className="text-break">{user.username} </h3>
        <FollowButton userId={user.id} />
        <p>Following: {user.following.length}</p>
        <p>Followers: {user.followers.length}</p>
      </div>
    );
  };

  return (
    <>
      <h2 className="card text-start p-2 mt-3 ">Users:</h2>
      {users &&
        users.map((user, i) => {
          return <UserCardInHomePage key={i} user={user} />;
        })}
    </>
  );
}
