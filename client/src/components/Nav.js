import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";

const Nav = () => {
  const { user, setUser } = useUserContext();

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="container">
      <Link to="/">HOME</Link>
      {user ? (
        <Link to="/" onClick={logout}>
          Logout
        </Link>
      ) : (
        <Link to="/login">LOGIN</Link>
      )}
    </nav>
  );
};

export default Nav;
