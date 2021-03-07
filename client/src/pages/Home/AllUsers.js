import axios from "axios";
import { useState, useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";

export default function AllUsers() {
  const [users, setUsers] = useState(null);
  const { user } = useUserContext();

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

  const unfollow = async (followingUserId) => {
    console.log("follow");
    try {
      const res = await axios.post("/api/follows", {
        user1_id: user.id,
        user2_id: followingUserId,
      });
      console.log(res.data.success);
    } catch (err) {
      console.log(err);
    }
  };

  const follow = async (followingUserId) => {
    console.log("follow");
    try {
      const res = await axios.post("/api/follows", {
        user1_id: user.id,
        user2_id: followingUserId,
      });
      console.log(res.data.success);
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
                <h3>{user_itr.username}</h3>
                {user && user.id !== user_itr.id && (
                  <button
                    onClick={() => {
                      follow(user_itr.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
