import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { useAuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const Nav = () => {
  const { user, setUser } = useUserContext();
  const { auth, setAuth } = useAuthContext();

  const logout = async () => {
    try {
      await axios.get('/api/logout');
      setUser(null);
      setAuth(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar d-flex " style={{ backgroundColor: '#ACC5AA' }}>
      <Link className="navbar-brand ms-5 " to="/">
        plant
      </Link>
      <div className="d-flex flex-col w-50">
        <input
          className="w-100"
          placeholder="Search for people, posts, and plants"
        ></input>
        <select className="form-select w-25">
          <option value="posts">Posts</option>
          <option value="database">Database</option>
        </select>
      </div>

      <div className="me-5 ">
        {auth || user ? (
          <>
            <Link to="/profile/:username" className="me-3">
              <button type="button" className="btn btn-outline-light">
                Profile
              </button>
            </Link>
            <Link to="/" onClick={logout}>
              <button type="button" className="btn btn-outline-light">
                Logout
              </button>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <button type="button" className="btn btn-outline-light">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
