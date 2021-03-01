import { useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

const Post = () => {
  const { id } = useParams();
  const { user } = useUserContext();

  return (
    <div>
      POST PAGE - {id} - {user && user.username}
    </div>
  );
};

export default Post;
