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

  return (
    <div className="display-grid-center">
      <h2>Users:</h2>
      <ul>
        {users &&
          users.map((user_i, i) => {
            return (
              <li key={i}>
                <h3>{user_i.username} </h3>
                <FollowButton userId={user_i.id} />
                <p>Following: {user_i.following.length}</p>
                <p>Followers: {user_i.followers.length}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
