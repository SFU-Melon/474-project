import { useParams } from 'react-router-dom';
const Profile = () => {
  const { username } = useParams();

  return <div>PROFILE PAGE - {username}</div>;
};

export default Profile;
