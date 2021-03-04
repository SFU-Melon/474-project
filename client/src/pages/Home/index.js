import { Link } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContext";
import ImageUpload from "../../components/ImageUpload";

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
      <ImageUpload name={"profile"} />
      <img
        src="https://testbucket-354.s3-us-west-1.amazonaws.com/a72cd462-276c-451b-b336-c7654a9dc273"
        width="400"
        height="400"
      />
    </div>
  );
}
