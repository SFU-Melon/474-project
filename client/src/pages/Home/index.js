import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';

export default function Home() {
  const id = 4;
  const { user, setUser } = useUserContext();

  const logout = async () => {
    try {
      const res = await axios.get('/api/logout');
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      {user && (
        <div>
          <h1>{user.email}</h1>
          <button onClick={logout}>Logout</button>
        </div>
      )}
      <Link to={`/post/${id}`}>POST - {id}</Link>
    </div>
  );
}
