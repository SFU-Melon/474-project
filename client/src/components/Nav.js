import { Link, useLocation, useHistory } from "react-router-dom";
import { useUserContext } from "@contexts/UserContext";
import { useAuthContext } from "@contexts/AuthContext";
import axios from "axios";

const Nav = () => {
  const { user, setUser } = useUserContext();
  const { auth, setAuth } = useAuthContext();

  let location = useLocation().pathname;
  let history = useHistory();

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      setUser(null);
      setAuth(false);
      if (location === `/profile/${user.username}`) {
        history.push("/");
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar d-flex " style={{ backgroundColor: "#ACC5AA" }}>
      <Link className="navbar-brand ms-5 " to="/">
        plant
      </Link>

      <div className="me-5 ">
        <Link to="/plants" className="me-3">
          <button type="button" className="btn btn-outline-light">
            Plants
          </button>
        </Link>
        {auth || user ? (
          <>
            <Link
              to={`/profile/${encodeURIComponent(user?.username)}`}
              className="me-3"
            >
              <button type="button" className="btn btn-outline-light">
                Profile
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          [
            <Link
              key={"login"}
              to={{ pathname: "/login", state: { prevPath: location } }}
              className="me-3"
            >
              <button type="button" className="btn btn-outline-light">
                Login
              </button>
            </Link>,

            <Link key={"signup"} to="/signup">
              <button type="button" className="btn btn-outline-light">
                Sign Up
              </button>
            </Link>,
          ]
        )}
      </div>
    </nav>
  );
};

export default Nav;
