import { Link, useLocation, useHistory } from "react-router-dom";
import { useUserContext } from "@contexts/UserContext";
import { useAuthContext } from "@contexts/AuthContext";
import axios from "axios";
import SearchBar from "./SearchBar";
import "./nav.css";
import { useState } from "react";

const Nav = () => {
  const { user, setUser } = useUserContext();
  const { auth, setAuth } = useAuthContext();
  const [isToggled, setIsToggled] = useState(false);

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

  const handleStyleOnClick = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <nav
      className="navbar navbar-expand-lg d-flex 
      align-items-center w-100 "
      style={{ backgroundColor: "#ACC5AA" }}
    >
      <div className="small-container d-flex w-75">
        <div className="align-item-start">
          <Link className="navbar-brand ms-4 " to="/">
            Planter
          </Link>
        </div>

        <div className="w-50">
          <SearchBar />
        </div>

        <button
          className="navbar-toggler bg-primary d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleStyleOnClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div
        className="w-25 d-lg-none collapse navbar-collapse "
        id="navbarToggler"
      >
        <ul className="navbar-nav  mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/plants" className="nav-link me-3">
              <button type="button" className="btn btn-outline-light">
                Plants
              </button>
            </Link>
          </li>

          {auth || user ? (
            <>
              <li className="nav-item">
                <Link
                  to={`/profile/${encodeURIComponent(user?.username)}`}
                  className="nav-link me-3"
                >
                  <button type="button" className="btn btn-outline-light">
                    Profile
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="nav-link btn btn-outline-light "
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  key={"login"}
                  to={{ pathname: "/login", state: { prevPath: location } }}
                  className="nav-link me-3 "
                >
                  <button type="button" className="btn btn-outline-light">
                    Login
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link key={"signup"} to="/signup" className="nav-link">
                  <button type="button" className="btn btn-outline-light">
                    Sign Up
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
