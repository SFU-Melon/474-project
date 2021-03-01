import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const Nav = () => {
  const { user } = useUserContext();
  return (
    <nav className="container">
      <Link to="/">HOME</Link>
      {user ? <button>Logout</button> : <Link to="/login">LOGIN</Link>}
    </nav>
  );
};

export default Nav;
