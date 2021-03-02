import { Link } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContext";

export default function Home() {
  const id = 4;
  const { user } = useUserContext();

  return (
    <div>
      <h1>Home</h1>
      {user && (
        <div>
          <h1>{user.username}</h1>
        </div>
      )}
      <Link to={`/post/${id}`}>POST - {id}</Link>
    </div>
  );
}
