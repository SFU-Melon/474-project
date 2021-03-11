import axios from "axios";
import { useState, useEffect } from "react";
import FollowButton from "../../components/FollowButton";

export default function AllUsers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/getAllUsers");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>All Users:</h1>
      <ul>
        {users &&
          users.map((user_itr, i) => {
            return (
              <li key={i}>
                <h3>{user_itr.username} </h3>
                <p>Following: {user_itr.following.length}</p>
                <p>Followers: {user_itr.followers.length}</p>
                <FollowButton userId={user_itr.id} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
