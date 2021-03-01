import { useParams } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

const Post = () => {
  const { id } = useParams();
  const { user, setUser } = useUserContext();

  return (
    <div>
      POST PAGE - {id} - {user && user.email}
    </div>
  );
};

export default Post;
