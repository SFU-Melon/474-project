import { Link, useLocation, useHistory } from "react-router-dom";
import { useUserContext } from "@contexts/UserContext";
import { useAuthContext } from "@contexts/AuthContext";
import SearchBar from "./SearchBar";
import "./nav.css";
import { useState } from "react";
import { Auth } from 'aws-amplify';

const Nav = () => {
  const { user, setUser } = useUserContext();
  const { auth, setAuth } = useAuthContext();
  const [isToggled, setIsToggled] = useState(false);

  let location = useLocation().pathname;
  let history = useHistory();

  const logout = async () => {
    try {
      await Auth.signOut();
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
      className="navbar  navbar-expand-lg "
      style={{ backgroundColor: "#ACC5AA" }}
    >
      <div className="navbar-container d-flex align-items-center w-100 ">
        <div className="small-container d-flex ">
          <div className="navbar-brand">
            <Link className=" ms-4 " to="/">
              <div className="row">
                <div className="col" style={{ paddingRight: 0 }}>
                  <img
                    src={process.env.PUBLIC_URL + "/muskmelon-logo.png"}
                    width="30"
                    height="30"
                  />
                </div>
                <div
                  className="col display-grid-center"
                  style={{ paddingLeft: 0 }}
                >
                  <h3 className="brand-name">Educational Q&A</h3>
                </div>
              </div>
            </Link>
          </div>
          <div className="searchbar ">
            <SearchBar />
          </div>

          <button
            className="navbar-toggler  d-lg-none "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleStyleOnClick}
          >
            <span className="material-icons">menu</span>
          </button>
        </div>

        <div className="d-lg-none collapse navbar-collapse " id="navbarToggler">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Link to="/about" className="nav-link">
                <button type="button" className="btn btn-outline-light">
                  About
                </button>
              </Link>
            </li>

            {auth || user ? (
              <>
                <li className="nav-item">
                  <Link
                    to={`/profile/${encodeURIComponent(user?.username)}`}
                    className="nav-link"
                  >
                    <button type="button" className="btn btn-outline-light">
                      Profile
                    </button>
                  </Link>
                </li>
                <li className="nav-item item-logout">
                  <div className="nav-link ">
                    <button
                      type="button"
                      className="btn btn-outline-light "
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    key={"login"}
                    to={{ pathname: "/login", state: { prevPath: location } }}
                    className="nav-link "
                  >
                    <button type="button" className="btn btn-outline-light ">
                      Login
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link key={"signup"} to="/signup" className=" nav-link">
                    <button type="button" className="btn btn-outline-light">
                      Sign Up
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="searchbar-small ">
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
