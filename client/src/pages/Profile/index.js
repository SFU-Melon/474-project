import { useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

const Profile = () => {
  const { username } = useParams();
  const { user, setUser } = useUserContext();

  return (
    <div>
      {console.log(user)}
      PROFILE PAGE - {username} - {user && user.username}
    </div>
  );
};

export default Profile;
